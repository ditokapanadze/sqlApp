const JWT_KEY = process.env.SECRET_KEY || "jwtKey";
const NODE_ENV = process.env.NODE_ENV || "development";
const __prod__ = NODE_ENV === "production";

module.exports = {
  JWT_KEY,
  NODE_ENV,
  __prod__,
};
