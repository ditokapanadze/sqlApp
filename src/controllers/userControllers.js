const { searchUser, getAll } = require("../services/userServices.js");

exports.searchUser = async (req, res, next) => {
  const query = req.query;
  const user = await searchUser(query);
  res.status(200).json(user);
};

exports.getAll = async (req, res, next) => {
  const users = await getAll();

  res.status(200).json(users);
};
