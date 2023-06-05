const Joi = require("joi");

const validSchema = Joi.object({
  role: Joi.number().required().messages({
    "any.required": "Role을 입력해주세요.",
  }),

  user_name: Joi.string().required().messages({
    "string.base": "User Name은 문자열이어야 합니다.",
    "any.required": "User Name을 입력해주세요.",
  }),

  phone_number: Joi.string().length(11).required().messages({
    "string.base": "전화번호는 문자열이어야 합니다.",
    "any.required": "전화번호를 입력해주세요.",
    "string.length": "전화번호는 11자리여야 합니다.",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email은 문자열이어야 합니다.",
      "any.required": "Email을 입력해주세요.",
      "string.email": "Email이 형식에 맞지 않습니다.",
    }),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.base": "비밀번호는 문자열이어야 합니다.",
      "any.required": "비밀번호를 입력해주세요.",
      "string.pattern.base":
        "비밀번호는 3~30자의 영문자와 숫자로 이루어져야 합니다.",
    }),
});

module.exports = validSchema;
