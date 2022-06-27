const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  signatureVersion: "v4",
  region: "eu-central-1",
});

exports.s3 = s3;
