const { lookup } = require("mime-types");
const { uuid } = require("uuidv4");
const { S3_BASE_URL } = require("../constant.js");
const { s3 } = require("../utils/s3.js");
const { Media, Avatar } = require("../models");

// media controller

exports.upload = async (req, res, next) => {
  const { original_filename } = req.body;
  const { user } = req;
  const { type } = req.params;

  console.log(type);

  if (!original_filename)
    return res.status(403).json({ msg: "invalid filename" });

  const extension = original_filename.split(".")[1];
  if (!extension) return res.status(403).json({ msg: "invalid extension" });

  const contentType = lookup(extension);
  const filename = `${uuid()}.${extension}`;
  const key = `${user.uuid}/${filename}`;

  const signedUrl = await s3.getSignedUrl("putObject", {
    Bucket: "blog-bucket556444",
    ContentType: contentType,
    Key: key,
    // todo add expiration time
    Expires: 5 * 60 * 60,
  });

  const imageUrl = `${S3_BASE_URL}/${key}`;

  if (!signedUrl) throw new AppError("something went wrong", 500);
  if (type === "post") {
    const newMedia = await Media.create({
      path: key,
      content_type: contentType,
      original_filename,
      author_uuid: user.uuid,
    });

    const media = { signedUrl, imageUrl };

    // const media = await upload(user);
    return res.status(200).json(media);
  }

  const avatar = await Avatar.findOne({
    where: {
      author_uuid: user.uuid,
    },
  });
  if (avatar) {
    avatar.path = key;
    avatar.original_filename = original_filename;
    await avatar.save();
    const media = { signedUrl, imageUrl };

    // const media = await upload(user);
    return res.status(200).json(media);
  }
  const newAvatar = await Avatar.create({
    path: key,
    content_type: contentType,
    original_filename,
    author_uuid: user.uuid,
  });
  const media = { signedUrl, imageUrl };

  // const media = await upload(user);
  res.status(200).json(media);
};
