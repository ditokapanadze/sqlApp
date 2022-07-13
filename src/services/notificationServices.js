const AppError = require("../utils/appError");
const { Post, Hashtag, Notification } = require("../models");

const { Op } = require("sequelize");
const logger = require("../logger/logger");

const seenNotification = async (uuid) => {
  logger.info(uuid);
  const notification = await Notification.findOne({
    where: {
      uuid,
    },
  });
  if (!notification) {
    throw new AppError("notification not found", 400);
  }
  notification.seen = true;
  await notification.save();
  return notification;
};

const getNotifications = async (uuid) => {
  console.log(uuid);
  const notifications = await Notification.findAll({
    where: {
      target_user: uuid,
    },
  });
  return notifications;
};

module.exports = {
  seenNotification,
  getNotifications,
};
