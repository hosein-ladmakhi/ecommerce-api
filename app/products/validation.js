const Joi = require("joi");

exports.createProductValidation = Joi.object().keys({
  title: Joi.string().min(3).required(),
  description: Joi.string().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
});

exports.updateProductValidation = Joi.object().keys({
  title: Joi.string().min(3).optional(),
  description: Joi.string().optional(),
  quantity: Joi.number().optional(),
  price: Joi.number().optional(),
  category: Joi.string().optional(),
});
