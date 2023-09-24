const Joi = require("joi");

exports.signInValidation = Joi.object().keys({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
});

exports.signUpValidation = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  mobile: Joi.string().required(),
  address: Joi.string().optional(),
});
