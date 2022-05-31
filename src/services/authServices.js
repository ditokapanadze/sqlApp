const { User } = require("../models");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

const register = async (userData) => {
  const { email, name, role, password, repassword } = userData;

  if (password !== repassword) {
    return res.status(400).json({ msg: " passwords doesn't match" });
  }

  try {
    const user = await User.create({ email, name, role });

    const token = await jwt.sign(
      {
        id: user.uuid,
        name: user.name,
        email: user.email,
      },
      process.env.SECRET_KEY
    );
    return token;
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
};

module.exports = {
  register,
};
