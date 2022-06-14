const { upload, uploadRequest } = require("../services/uploadServices.js");

exports.upload = async (req, res, next) => {
  const user = req.user;

  const media = await upload(user);
  res.status(200).json(media);
};
