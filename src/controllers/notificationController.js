const { seenNotification } = require("../services/seenNotification.js");

exports.seenNotification = async (req, res, next) => {
  const { uuid } = req.params;

  console.log(uuid);

  const response = await seenNotification(uuid);

  res.status(200).json(response);
};
