const AppError = require("../utils/appError");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { User } = require("../models");
const crypto = require("crypto");
const sendEmail = require("../utils/mailer.js");
const bcrypt = require("bcryptjs");
const searchUser = async (query) => {
  console.log(query);
  const user = await User.findAll({
    where: {
      name: {
        [Op.like]: "%" + query.name + "%",
      },
    },
  });
  if (user.length < 1) resetrequest;
  return user;
};

const getAll = async () => {
  const users = await User.findAll();
  if (users.length < 1) throw new AppError("no users found", 400);
  return users;
};
const resetRequest = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new AppError("user not found", 400);

  const resetToken = crypto.randomBytes(32).toString("hex");
  const date = new Date();

  user.resetToken = resetToken;
  user.resetTokenExpireAt = date.setDate(date.getDate() + 1);

  await user.save();

  const resetLink = `http://localhost:8000/api/v1/user/passwordreset/${resetToken}`;

  const message = `
  <h4>Follow link above to reset your password</h4>
  <a href=${resetLink} >${resetLink}</a>
  <p>Please follow the link bellow, and do not share it with anybody:</p>
`;

  const mailSent = await sendEmail({
    to: user.email,
    subject: "Password reset",
    text: message,
  });
  console.log(mailSent);

  return true;
};

const passwordReset = async (token, password) => {
  const user = await User.findOne({ where: { resetToken: token } });

  if (!user) throw new AppError("user not found", 400);

  const d = new Date();
  let presentTime = d.getTime();
  let expireTime = user.resetTokenExpireAt.getTime();

  if (expireTime < presentTime) {
    throw new AppError(`reset password time has expired`, 400);
  }

  const hashedPass = await bcrypt.hash(password, 12);

  user.password = hashedPass;
  user.resetToken = null;
  user.resetTokenExpireAt = null;

  await user.save();
  return true;
};

module.exports = {
  searchUser,
  getAll,
  resetRequest,
  passwordReset,
};
