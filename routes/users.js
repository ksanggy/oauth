const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const {updateValidation} = require('../validation');

//find user by ID after jwt verification
router.get('/', verify, async (req, res)=>{
  console.log('request for user with userId = ', req.user._id);
  //Get user data from database
  const user = await User.findById(req.user._id);
  console.log('searched user info = ', user);
  res.json(user);
});

//UPDATE user
router.put('/', verify, async (req, res)=>{
  console.log('request body = ', req.body);

  //validate user info
  const {error} = updateValidation(req.body);
  if(error) return res.status(400).send(error.details);
  console.log('errors = ', error);

  //check if user already exists in db
  const oldUser = await User.findById(req.user._id);
  const emailExist = await User.findOne({email: req.body.email});
  const isDiffEmail = oldUser.email !== req.body.email;
  if(isDiffEmail && emailExist) return res.status(400).send('Email already exists!');

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create new User object with new info
  const user = new User({
    _id: req.user._id,
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  console.log('tobe user info = ', user);

  // update user info and respond with updated user info
  try {
    //using the mongoose User object, you call updateOne providing the so-called filter ('pk to search for').
    //$set key is used to pass on fields to change -> key : {key:value, key:value}
    //updateOne will return object that has info of "acknowledge t/f, modifiedCount, matchCount, upserted"
    const updatedUser = await User.updateOne({_id: req.user._id}, {$set: {
      'name': user.name,
      'email': user.email,
      'password': user.password
    }});
    console.log('user info updated = ', updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});


module.exports = router;