const jwt = require("jsonwebtoken");
const { User } = require("../models");
const AppError = require("../utils/appError");
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new AppError(`not authorized`, 401);
  }
  const { email } = jwt.verify(token, process.env.SECRET_KEY);
  console.log(email);
  if (!email) throw new AppError(`not authorized`, 401);

  const user = await User.findOne({ where: { email } });

  console.log("______________________________________________________________");
  if (!user) {
    throw new AppError(`user not found`, 404);
  }
  req.user = user;

  next();
};

module.exports = verifyToken;
