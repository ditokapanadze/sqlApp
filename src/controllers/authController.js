const { catchAsync } = require("../utils/catchAsync");
const { register, login } = require("../services/authServices.js");

exports.register = async (req, res, next) => {
  const userData = req.body;
  const token = await register(userData);
  console.log(token);
  res.status(200).json({ token });
};
exports.login = async (req, res, next) => {
  const userData = req.body;
  const token = await login(userData);

  res.status(200).json({ token });
};
