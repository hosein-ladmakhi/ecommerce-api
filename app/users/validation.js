const Joi = require("joi");

exports.updateUserValidation = Joi.object().keys({
  email: Joi.string().email().optional(),
  username: Joi.string().min(3).optional(),
  password: Joi.string().min(8).optional(),
  firstName: Joi.string().min(3).optional(),
  lastName: Joi.string().min(3).optional(),
  mobile: Joi.string().optional(),
  address: Joi.string().optional(),
});
