const { celebrate, Joi, errors, Segments } = require("celebrate");

const joiSchema = Joi.object({
  role: Joi.number().required(),
  user_name: Joi.string().required(),
  phone_number: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

module.exports = joiSchema;
