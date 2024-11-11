const Joi = require("joi");

// 確認使用者資料是否符合規範
const registerValidator = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(50).required(),
    password: Joi.string().min(6).max(255).required(),
    role: Joi.string().required().valid("student", "instructor"),
  });

  return schema.validate(data);
};

// 確認登入者輸入的資料是否有符合規範
const loginValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

// 確認課程資料是否符合規範
const courseValidator = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(4).max(50).required(),
    description: Joi.string().min(6).max(50).required(),
    price: Joi.number().min(10).max(999).required(),
  });

  return schema.validate(data);
};

module.exports.registerValidator = registerValidator;
module.exports.loginValidator = loginValidator;
module.exports.courseValidator = courseValidator;
