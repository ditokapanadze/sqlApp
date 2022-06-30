const {
  seenNotification,
  getNotifications,
} = require("../services/seenNotification.js");

exports.seenNotification = async (req, res, next) => {
  const { uuid } = req.params;

  console.log(uuid);

  const response = await seenNotification(uuid);

  res.status(200).json(response);
};
exports.getNotifications = async (req, res, next) => {
  const uuid = req.user.uuid;

  console.log(uuid);

  const notifications = await getNotifications(uuid);

  res.status(200).json(notifications);
};
