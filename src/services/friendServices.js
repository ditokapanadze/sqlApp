const AppError = require("../utils/appError");

const { Op } = require("sequelize");

const { User, FriendRequests, Friends } = require("../models");

const sendFriendRequest = async (sender, receiver) => {
  const sender_uuid = sender.uuid;
  const receiver_uuid = receiver.uuid;
  console.log(receiver);
  const user = await User.findOne({
    where: {
      uuid: receiver_uuid,
    },
    include: [{ model: User, as: "sentRequests" }],
  });
  if (user.uuid === sender.uuid) {
    throw new AppError(`you can not send friend request to yourself`, 400);
  }
  const checkRequest = await FriendRequests.findOne({
    where: {
      sender_uuid,
      receiver_uuid,
    },
  });
  if (checkRequest) {
    throw new AppError(`friend request already sent`, 400);
  }
  const newFriendRequest = await FriendRequests.create({
    sender_uuid,
    receiver_uuid,
  });
  return newFriendRequest;
};

const responseFriendRequest = async (sender_uuid, receiver_uuid, confirm) => {
  if (confirm) {
    const checkFriend = await Friends.findOne({
      where: { sender_uuid, receiver_uuid },
    });
    if (checkFriend) {
      throw new AppError(`Friend already added`, 400);
    }

    const friend = await Friends.create({ sender_uuid, receiver_uuid });
    const request = await FriendRequests.findOne({
      sender_uuid,
      receiver_uuid,
    });
    await request.destroy();
    return true;
  } else {
    const request = await FriendRequests.findOne({
      sender_uuid,
      receiver_uuid,
    });
    await request.destroy();
    return false;
  }
};

const deleteFriend = async (user, uuid) => {
  const friend = await Friends.findOne({
    where: {
      [Op.or]: [
        { sender_uuid: user.uuid, receiver_uuid: uuid },
        {
          sender_uuid: uuid,
          receiver_uuid: user.uuid,
        },
      ],
    },
  });

  if (!friend) {
    throw new AppError(`Friend already added`, 400);
  }

  await friend.destroy();
};

module.exports = {
  sendFriendRequest,
  deleteFriend,
  responseFriendRequest,
};
