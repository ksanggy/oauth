const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');

//REGISTER
router.post('/register', async (req, res) => {
  console.log('req body = ', req.body);
  //LETS VALIDATE THE DATA BEFORE USING
  const {error} = registerValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message); // error handling

  //check if user already exists in db
  const emailExist = await User.findOne({email: req.body.email});
  if(emailExist) return res.status(400).send('Email already exists!');

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //Create new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.send({user: user._id});
  } catch (error) {
    res.status(400).send(error);
  }
});


//LOGIN
router.post('/login', async (req, res) => {
  //VALIDATION
  const{error} = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  //CHECKING if email exists
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send('Email or password is wrong');
  //Password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send('Email or password is wrong');

  //Create and assign a token
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);


});

module.exports = router;