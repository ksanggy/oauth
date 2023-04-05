const router = require('express').Router();
const User = require('../model/User');

//VALIDATION
const Joi = require('@hapi/joi');

const schema = {
  name:Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
}


router.post('/register', async (req, res) => {
  console.log('req body = ', req.body);
  //LETS VALIDATE THE DATA BEFORE USING
  const validation = Joi.attempt(req.body.email, schema.email)
  res.send(validation);
  // const user = new User({
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password
  // });
  // console.log('the user is = ', user);
  // try {
  //   const savedUser = await user.save();
  //   res.send(savedUser)
  // } catch (error) {
  //   res.status(400).send(error);
  // }
});

module.exports = router;