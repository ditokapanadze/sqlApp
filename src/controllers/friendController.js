const {
  sendFriendRequest,
  responseFriendRequest,
  deleteFriend,
} = require("../services/friendServices.js");

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

exports.deleteFriend = async (req, res, next) => {
  const user = req.user;
  const uuid = req.params.uuid;

  const response = await deleteFriend(user, uuid);

  res.status(200).json({ msg: "friend deleted" });
};
