const AppError = require("../utils/appError");
const AWS = require("aws-sdk");
const { uuid } = require("uuidv4");
const { S3_BASE_URL } = require("../constant");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  signatureVersion: "v4",
  region: "eu-central-1",
});

const upload = async (user) => {
  console.log(user);
  const key = `${user.id}/${uuid()}.jpeg`;

  const url = await s3.getSignedUrl("putObject", {
    Bucket: "blog-bucket556444",
    ContentType: "image/jpeg",
    Key: key,
  });
  console.log(url);
  const imageUrl = `${S3_BASE_URL}/${key}`;
  if (!url) throw new AppError("something went wrong", 500);
  return { url, imageUrl };
};

module.exports = {
  upload,
};
