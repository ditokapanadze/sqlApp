const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const AppError = require("../utils/appError");

const register = async (userData) => {
  const { email, name, password, repassword } = userData;
  console.log(password);
  console.log(password);
  if (password !== repassword) {
    throw new AppError(`passwords doesn't match`, 404);
  }
  const existingUser = await User.findOne({ where: { email } });
  // როლი შესცვლელაი
  if (existingUser) throw new AppError("email already in use", 400);
  const hashedPass = await bcrypt.hash(password, 12);
  console.log(hashedPass);
  const user = await User.create({ email, name, password: hashedPass });

  const token = jwt.sign(
    {
      id: user.uuid,
      name: user.name,
      email: user.email,
    },
    process.env.SECRET_KEY,
  );
  return token;
};

const login = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ where: { email } });
  if (!user) throw new AppError(`password or email is incorrect`, 400);

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError(`password or email is incorrect`, 400);
  }
  const token = jwt.sign(
    {
      id: user.uuid,
      name: user.name,
      email: user.email,
    },
    process.env.SECRET_KEY,
  );
  return token;
};

module.exports = {
  register,
  login,
};
