const Joi = require("joi");

exports.createCategoryValidation = Joi.object().keys({
  title: Joi.string().min(3).required(),
});

exports.updateCategoryValidation = Joi.object().keys({
  title: Joi.string().min(3).optional(),
});
