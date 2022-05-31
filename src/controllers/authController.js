const { catchAsync } = require("../utils/catchAsync");
const { register } = require("../services/authServices.js");

exports.register = catchAsync(async (req, res) => {
  const userData = req.body;
  const token = await register(userData);
  console.log(token);
  res.status(200).json(token);
});
