const JWT_KEY = process.env.SECRET_KEY || "jwtKey";
const NODE_ENV = process.env.NODE_ENV || "development";
const __prod__ = NODE_ENV === "production";
const S3_BASE_URL = "https://blog-bucket556444.s3.eu-central-1.amazonaws.com";

module.exports = {
  JWT_KEY,
  NODE_ENV,
  __prod__,
  S3_BASE_URL,
};
