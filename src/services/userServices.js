const AppError = require("../utils/appError");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { User } = require("../models");

const searchUser = async (query) => {
  console.log(query);
  const user = await User.findAll({
    where: {
      name: {
        [Op.like]: "%" + query.name + "%",
      },
    },
  });
  if (user.length < 1) throw new AppError("user not found", 400);
  return user;
};

const getAll = async () => {
  const users = await User.findAll();
  if (users.length < 1) throw new AppError("no users found", 400);
  return users;
};

module.exports = {
  searchUser,
  getAll,
};
