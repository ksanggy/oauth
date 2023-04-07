//VALIDATION
const Joi = require('@hapi/joi');

// Register valiation
const registerValidation = data => {
  // newer version of Joi had been changed in declaring validation objects.
  const schema = Joi.object({
    name:Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
    //LETS VALIDATE THE DATA BEFORE USING
    return schema.validate(data); // new version way of validating the model
};

// login validation
const loginValidation = data => {
  // newer version of Joi had been changed in declaring validation objects.
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
    //LETS VALIDATE THE DATA BEFORE USING
    return schema.validate(data); // new version way of validating the model
};

// UPDATE USER validation
const updateValidation = data => {
  // newer version of Joi had been changed in declaring validation objects.
  const schema = Joi.object({
    name:Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
    //LETS VALIDATE THE DATA BEFORE USING
    return schema.validate(data); // new version way of validating the model
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateValidation = updateValidation;