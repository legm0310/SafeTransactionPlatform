const Joi = require("joi");
const { BadRequestError } = require("../utils");

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new BadRequestError(error.details[0].message));
      // return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

module.exports = validateRequest;
