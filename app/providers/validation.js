const Joi = require("joi");

exports.createProvidersValidation = Joi.object().keys({
  name: Joi.string().required(),
  bio: Joi.string().required(),
  website: Joi.string().required(),
});

exports.updateProvidersValidation = Joi.object().keys({
  name: Joi.string().optional(),
  bio: Joi.string().optional(),
  website: Joi.string().optional(),
});
