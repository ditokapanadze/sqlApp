const AppError = require("../utils/appError");
const AWS = require("aws-sdk");
const { uuid } = require("uuidv4");

const s3 = new AWS.S3({
  accessKeyId: "AKIARRQAIGZF5UJT2DUF",
  secretAccessKey: "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",
  signatureVersion: "v4",
  region: "eu-central-1",
});

const upload = async (user) => {
  console.log(user);
  const key = `${user.id}/${uuid()}.jpeg`;

  const url = await s3.getSignedUrl("putObject", {
    Bucket: "blog-bucket556444",
    ContentType: "image/jpeg",
    Key: "769cd8d0-3eae-4ff2-ac7e-8e3ba1ab8009.jpeg",
  });
  console.log(url);
  if (!url) throw new AppError("something went wrong", 500);
  return { url, key };
};

module.exports = {
  upload,
};
