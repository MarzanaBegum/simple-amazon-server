const Joi = require("joi");
const mongoose = require("mongoose");
const { StatusError } = require("../utils/error");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

const SignupValidate = async (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity()
      .label("Password")
      .required()
      .error(
        StatusError(
          "Your password must be at least 8 characters long, contain a mixture of number,symbol,uppercase and lowercase letters.",
          400
        )
      ),
    isAdmin: Joi.boolean(),
  });
  return await schema.validateAsync(data);
};
const SignInValidate = async (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity()
      .label("Password")
      .required()
      .error(
        StatusError(
          "Your password must be at least 8 characters long, contain a mixture of number,symbol,uppercase and lowercase letters.",
          400
        )
      ),
  });
  return await schema.validateAsync(data);
};

module.exports = { User, SignupValidate, SignInValidate };
