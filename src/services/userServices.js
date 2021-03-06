const AppError = require("../utils/appError");
const Sequelize = require("sequelize");
const { emitter, events } = require("../utils/eventEmitter");
const Op = Sequelize.Op;

const {
  User,
  Post,
  FriendRequests,
  PostLike,
  Friends,
  Media,
  Avatar,
} = require("../models");
const crypto = require("crypto");
const sendEmail = require("../utils/mailer.js");
const bcrypt = require("bcryptjs");
const avatar = require("../models/avatar");

const searchUser = async (query) => {
  const user = await User.findAll({
    where: {
      name: {
        [Op.like]: "%" + query.name + "%",
      },
    },
    include: [
      { model: Post, as: "posts" },
      { model: Media, as: "media" },
    ],
  });
  // if (user.length < 1) resetrequest;
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

const sendFriendRequest = async (sender, receiver) => {
  const sender_uuid = sender.uuid;
  const receiver_uuid = receiver.uuid;

  const user = await User.findOne({
    where: {
      uuid: receiver_uuid,
    },
    include: [{ model: User, as: "sentRequests" }],
  });
  if (user.uuid === sender.uuid) {
    throw new AppError(`you can not send friend request to yourself`, 400);
  }
  const checkRequest = await FriendRequests.findOne({
    where: {
      sender_uuid,
      receiver_uuid,
    },
  });
  if (checkRequest) {
    throw new AppError(`friend request already sent`, 400);
  }
  const newFriendRequest = await FriendRequests.create({
    sender_uuid,
    receiver_uuid,
  });
  return newFriendRequest;
};

const responseFriendRequest = async (sender_uuid, receiver_uuid, confirm) => {
  if (confirm) {
    const checkFriend = await Friends.findOne({ sender_uuid, receiver_uuid });
    if (checkFriend) {
      throw new AppError(`Friend already added`, 400);
    }

    const friend = await Friends.create({ sender_uuid, receiver_uuid });
    const request = await FriendRequests.findOne({
      sender_uuid,
      receiver_uuid,
    });
    await request.destroy();
    return true;
  } else {
    const request = await FriendRequests.findOne({
      sender_uuid,
      receiver_uuid,
    });
    await request.destroy();
    return false;
  }
};

// const changeAvatar = async (user_uuid, photoUrl) => {
//   const user = await User.findOne({ where: { uuid: user_uuid } });

//   if (!user) {
//     throw new AppError(`Friend already added`, 400);
//   }

//   user.avatar = photoUrl;
//   await user.save();
// };

const getUser = async (uuid) => {
  const user = await User.findOne({
    where: {
      uuid,
    },
    include: [
      { model: Post, as: "posts" },
      { model: Media, as: "media" },
      { model: PostLike, as: "likes" },
      { model: Avatar, as: "avatar" },
      { model: Friends, as: "sentFriends" },
      { model: Friends, as: "receivedFriends" },
    ],
  });

  return user;
};

const editInfo = async (uuid, info) => {
  const { name, email } = info;
  const user = await User.findOne({
    where: {
      uuid,
    },
  });
  if (!user) {
    throw new AppError(`user not found`, 400);
  }
  user.set({
    ...(name && { name }),
    ...(email && { email }),
  });

  await user.save();
  return user;
};

const changePassword = async (uuid, password, newPassword) => {
  const user = await User.findOne({
    where: {
      uuid,
    },
  });
  if (!user) {
    throw new AppError(`user not found`, 400);
  }

  console.log(password);
  console.log(user.password);

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new AppError(`password incorrect`, 400);
  }
  newPassword = await bcrypt.hash(newPassword, 12);
  user.password = newPassword;
  await user.save();
  return user;
};

module.exports = {
  searchUser,
  getAll,
  resetRequest,
  passwordReset,
  sendFriendRequest,
  responseFriendRequest,
  getUser,
  editInfo,
  changePassword,
};
