const {
  searchUser,
  getAll,
  resetRequest,
  passwordReset,
  responseFriendRequest,
  sendFriendRequest,
} = require("../services/userServices.js");

exports.searchUser = async (req, res, next) => {
  const query = req.query;
  const user = await searchUser(query);
  res.status(200).json(user);
};

exports.getAll = async (req, res, next) => {
  const users = await getAll();

  res.status(200).json(users);
};

exports.resetRequest = async (req, res, next) => {
  const email = req.params.email;
  const response = await resetRequest(email);

  res.status(200).json({ msg: "email sent" });
};

exports.passwordReset = async (req, res, next) => {
  const token = req.params.token;

  const password = req.body.password;
  const response = await passwordReset(token, password);

  res.status(200).json({ msg: "password changed" });
};

exports.sendFriendRequest = async (req, res, next) => {
  const receiver = req.params;
  const sender = req.user;

  const response = await sendFriendRequest(sender, receiver);

  res.status(200).json({ msg: "friend request sent" });
};
exports.responseFriendRequest = async (req, res, next) => {
  const sender_uuid = req.query.uuid;
  const receiver_uuid = req.user.uuid;
  const confirm = req.query.confirm;
  console.log();
  const response = await responseFriendRequest(
    sender_uuid,
    receiver_uuid,
    confirm,
  );
  if (response) {
    res.status(200).json({ msg: "friend added" });
  } else {
    res.status(200).json({ msg: "friend request declined" });
  }
};
