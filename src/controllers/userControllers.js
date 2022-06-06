const {
  searchUser,
  getAll,
  resetRequest,
  passwordReset,
} = require("../services/userServices.js");

exports.searchUser = async (req, res, next) => {
  const query = req.query;
  const user = await searchUser(query);
  res.status(200).json(user);
};

exports.getAll = async (req, res, next) => {
  const users = await getAll();

  res.status(200).json(users);
};
exports.resetRequest = async (req, res, next) => {
  const email = req.params.email;
  const response = await resetRequest(email);

  res.status(200).json({ msg: "email sent" });
};
exports.passwordReset = async (req, res, next) => {
  const token = req.params.token;

  const password = req.body.password;
  const response = await passwordReset(token, password);

  res.status(200).json({ msg: "password changed" });
};
