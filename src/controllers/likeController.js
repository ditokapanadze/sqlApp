const { sendLike } = require("../services/likeServices.js");

exports.sendLike = async (req, res, next) => {
  const { uuid: post_uuid, type } = req.params;
  const user_uuid = req.user.uuid;
  const response = await sendLike(post_uuid, user_uuid, type);

  res.status(200).json(response);
};
