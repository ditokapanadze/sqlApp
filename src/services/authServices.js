const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const mailer = require("nodemailer");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/mailer.js");

const register = async (userData) => {
  const { email, name, password, repassword } = userData;

  if (password !== repassword) {
    throw new AppError(`passwords doesn't match`, 404);
  }
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) throw new AppError("email already in use", 400);
  const hashedPass = await bcrypt.hash(password, 12);

  const activationToken = crypto.randomBytes(32).toString("hex");
  const date = new Date();

  const user = await User.create({
    email,
    name,
    password: hashedPass,
    activationToken,
    tokenExpireAt: date.setDate(date.getDate() + 1),
  });

  const verificationLink = `http://localhost:8000/api/v1/auth/verification/${activationToken}`;
  const message = `
  <h4>Follow link above to verify your account</h4>
  <a href=${verificationLink} >${verificationLink}</a>
  <p>Please follow the link bellow, and do not share it with anybody:</p>
  <p>P</p>
`;

  await sendEmail({
    to: user.email,
    subject: "Profile Verification",
    text: message,
  });

  const token = jwt.sign(
    {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      verified: user.verified,
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
      verified: user.verified,
    },
    process.env.SECRET_KEY,
    { expiresIn: "24h" },
  );
  return token;
};

const verification = async (token) => {
  const user = await User.findOne({ where: { activationToken: token } });

  const d = new Date();

  let presentTime = d.getTime();
  let expireTime = user.tokenExpireAt.getTime();
  if (expireTime < presentTime) {
    throw new AppError(`verification time has expired`, 400);
  }

  user.activationToken = null;
  user.tokenExpireAt = null;
  user.verified = true;

  await user.save();

  return true;
};

const verificationReq = async (uuid) => {
  const user = await User.findOne({ where: { uuid } });
  if (user.verified) throw new AppError(`Account already verified`, 400);

  const d = new Date();
  let presentTime = d.getTime();
  let expireTime = user.tokenExpireAt.getTime();

  if (expireTime < presentTime) {
    const activationToken = crypto.randomBytes(32).toString("hex");
    const date = new Date();

    user.activationToken = activationToken;
    user.tokenExpireAt = date.setDate(date.getDate() + 1);

    await user.save();

    const verificationLink = `http://localhost:8000/api/v1/auth/verification/${activationToken}`;

    const message = `
    <h4>Follow link above to verify your account</h4>
    <a href=${verificationLink} >${verificationLink}</a>
    <p>Please follow the link bellow, and do not share it with anybody:</p>
    <p>P</p>
  `;
    await sendEmail({
      to: user.email,
      subject: "Profile Verification",
      text: message,
    });
  } else {
    throw new AppError(`something went wrong`, 500);
  }
};

module.exports = {
  register,
  login,
  verification,
  verificationReq,
};
