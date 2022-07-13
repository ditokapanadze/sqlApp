const {
  register,
  login,
  verification,
  verificationReq,

  deleteSession,
} = require("../services/authServices.js");

exports.register = async (req, res, next) => {
  const userData = req.body;

  const token = await register(userData);

  res.status(200).json({ token });
};

exports.login = async (req, res, next) => {
  const userData = req.body;
  const { accessToken, refreshToken, user } = await login(userData);

  res.cookie("accessToken", accessToken, {
    // maxAge: 300000, // 5 min
    httpOnly: true,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  res.status(200).json(user);
};

exports.verification = async (req, res, next) => {
  const { token } = req.params;
  await verification(token);

  res.status(200).json({ msg: "Account verified successfully" });
};

exports.verificationReq = async (req, res, next) => {
  const { uuid } = req.params;
  await verificationReq(uuid);

  res.status(200).json({ msg: "Verification mail sent" });
};

exports.getSessionHandler = async (req, res, next) => {
  console.log(req.user);
  return res.send(req.user);
};

exports.deleteSessionHandler = async (req, res, next) => {
  const user = req.user;
  const { refreshToken } = req.cookies;
  res.cookie("accessToken", "", {
    maxAge: 0,
    httpOnly: true,
  });
  res.cookie("refreshToken", "", {
    maxAge: 0,
    httpOnly: true,
  });
  await deleteSession(user, refreshToken);
  return res.json({ msg: "log out" });
};
