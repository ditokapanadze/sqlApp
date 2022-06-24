const {
  sendFriendRequest,
  responseFriendRequest,
  deleteFriend,
  searchFriend,
} = require("../services/friendServices.js");

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
    confirm
  );

  if (!response) {
    return res.status(200).json({ msg: "friend request declined" });
  }

  res.status(200).json({ msg: "friend added" });
};

exports.deleteFriend = async (req, res, next) => {
  const user = req.user;
  const uuid = req.params.uuid;

  await deleteFriend(user, uuid);

  res.status(200).json({ msg: "friend deleted" });
};
exports.searchFriend = async (req, res, next) => {
  const query = req.query;
  const uuid = req.user.uuid;
  const friends = await searchFriend(query, uuid);
  res.status(200).json(friends);
};
