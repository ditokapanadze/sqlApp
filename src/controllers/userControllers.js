const {
  searchUser,
  getAll,
  resetRequest,
  passwordReset,
  responseFriendRequest,
  sendFriendRequest,
  changeAvatar,
  getUser,
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
  await resetRequest(email);

  res.status(200).json({ msg: "email sent" });
};

exports.passwordReset = async (req, res, next) => {
  const token = req.params.token;

  const password = req.body.password;
  await passwordReset(token, password);

  res.status(200).json({ msg: "password changed" });
};

exports.sendFriendRequest = async (req, res, next) => {
  const receiver = req.params;
  const sender = req.user;

  await sendFriendRequest(sender, receiver);

  res.status(200).json({ msg: "friend request sent" });
};
exports.responseFriendRequest = async (req, res, next) => {
  const sender_uuid = req.query.uuid;
  const receiver_uuid = req.user.uuid;
  const confirm = req.query.confirm;

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

exports.changeAvatar = async (req, res, next) => {
  const user_uuid = req.user.uuid;
  const { photoUrl } = req.body;
  await changeAvatar(user_uuid, photoUrl);

  res.status(200).json({ msg: "Avatar changed" });
};

exports.getUser = async (req, res, next) => {
  const uuid = req.user.uuid;

  const user = await getUser(uuid);
  res.status(200).json(user);
};
