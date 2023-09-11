const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const { SignInValidate, User, SignupValidate } = require("../models/UserModel");
const { EncryptData, MatchPassword, PasswordHash } = require("../utils");
const { StatusError } = require("../utils/error");
const bcrypt = require("bcrypt");

const handleSignUp = async (req, res) => {
  // validate body
  const { value, error } = await SignupValidate(req.body);
  if (error) throw StatusError(error.message, 400);
  // check user
  let user = await User.findOne({ email: req.body.email });
  if (user) throw StatusError("User already exist");

  // hash password
  req.body.password = await PasswordHash(req.body.password);
  // save user
  user = await new User(req.body).save();
  // send response
  const token = EncryptData({ id: user._id });
  res.status(200).send({
    user,
    token,
    message: "Signup successfull",
  });
};

const handleSignIn = async (req, res) => {
  const { error, value } = await SignInValidate(req.body);
  if (error) throw StatusError(error.message, 400);

  const user = await User.findOne({ email: req.body.email });
  if (!user) throw StatusError("Invalid credentials", 401);

  const isMatchPass = await MatchPassword(req.body.password, user.password);
  if (!isMatchPass) throw StatusError("Invalid credentials", 401);

  const token = EncryptData({ id: user._id });
  res.status(200).send({ token, user, message: "Login successfull" });
};

const updateUserSchema = Joi.object({
  name: Joi.string().label("Name"),
  email: Joi.string().email().label("Email"),
  password: passwordComplexity()
    .label("Password")
    .error(
      StatusError(
        "Your password must be at least 8 characters long, contain a mixture of number,symbol,uppercase and lowercase letters.",
        400
      )
    ),
});

const handleUpdateUser = async (req, res) => {
  const { value, error } = await updateUserSchema.validate(req.body);
  if (error) throw StatusError(error.message, 400);

  const user = await User.findOne({ _id: req.params.userId});
  if (!user) throw StatusError("User not found", 404);

  if (req.body.password) {
    req.body.password = await PasswordHash(req.body.password);
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.params.userId },
    req.body,
    {
      new: true,
    }
  );
  res.status(200).send(updatedUser);
};

module.exports = { handleSignIn, handleSignUp, handleUpdateUser };
