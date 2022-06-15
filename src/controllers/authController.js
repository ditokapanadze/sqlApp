const {
  register,
  login,
  verification,
  verificationReq,
} = require("../services/authServices.js");

exports.register = async (req, res, next) => {
  const userData = req.body;
  console.log(userData);
  const token = await register(userData);

  res.status(200).json({ token });
};
exports.login = async (req, res, next) => {
  const userData = req.body;
  const token = await login(userData);

  res.status(200).json({ token });
};
exports.verification = async (req, res, next) => {
  const { token } = req.params;
  const response = await verification(token);

  res.status(200).json({ msg: "Account verified successfully" });
};
exports.verificationReq = async (req, res, next) => {
  const { uuid } = req.params;
  const response = await verificationReq(uuid);

  res.status(200).json({ msg: "Verification mail sent" });
};
