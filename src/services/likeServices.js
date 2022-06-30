const AppError = require("../utils/appError");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const {
  User,
  FriendRequests,
  Friends,
  Notification,
  Post,
  PostLike,
} = require("../models");
const logger = require("../logger/logger");

const sendLike = async (post_uuid, user_uuid, type) => {
  console.log(post_uuid);
  console.log(user_uuid);
  console.log(type);
  const post = await Post.findOne({
    where: {
      uuid: post_uuid,
    },
  });
  if (!post) throw new AppError("post not found", 404);

  const existingLike = await PostLike.findOne({
    where: {
      post_uuid: post_uuid,
      user_uuid: user_uuid,
      type: type,
    },
  });
  if (existingLike) {
    await existingLike.destroy();
    return "post unlike";
  }
  const differentType = await PostLike.findOne({
    post_uuid: post_uuid,
    user_uuid: user_uuid,
  });
  if (differentType) {
    differentType.type = type;
    await differentType.save();
    return differentType;
  }
  const newLike = await PostLike.create({
    post_uuid: post_uuid,
    user_uuid: user_uuid,
    type: type,
  });
  return newLike;
};

module.exports = {
  sendLike,
};
