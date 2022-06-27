const AppError = require("../utils/appError");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { User, FriendRequests, Friends, Notification } = require("../models");
const logger = require("../logger/logger");

const sendFriendRequest = async (sender, receiver) => {
  const sender_uuid = sender.uuid;
  const receiver_uuid = receiver.uuid;
  logger.info(sender);
  logger.info(receiver);
  const user = await User.findOne({
    where: {
      uuid: receiver_uuid,
    },
    include: [{ model: User, as: "sentRequests" }],
  });
  if (!user) {
    throw new AppError(`user not found`, 400);
  }
  if (user.uuid === sender.uuid) {
    throw new AppError(`you can not send friend request to yourself`, 400);
  }
  const checkRequest = await FriendRequests.findOne({
    where: {
      sender_uuid,
      receiver_uuid,
    },
  });
  // TODO: უნდა შემოწმდეს მეგობრებში ხო არ ყავს უკვე
  if (checkRequest) {
    throw new AppError(`friend request already sent`, 400);
  }
  const newFriendRequest = await FriendRequests.create({
    sender_uuid,
    receiver_uuid,
  });
  await Notification.create({
    target_user: receiver.uuid,
    notifier_user: sender.uuid,
    type: "FRIEND REQUEST",
  });
  return newFriendRequest;
};

const responseFriendRequest = async (sender_uuid, receiver_uuid, confirm) => {
  if (!confirm) {
    const request = await FriendRequests.findOne({
      sender_uuid,
      receiver_uuid,
    });
    await request.destroy();
    return false;
  }
  const checkFriend = await Friends.findOne({
    where: { sender_uuid, receiver_uuid },
  });
  if (checkFriend) {
    throw new AppError(`Friend already added`, 400);
  }

  await Friends.create({ sender_uuid, receiver_uuid });
  const request = await FriendRequests.findOne({
    sender_uuid,
    receiver_uuid,
  });
  await request.destroy();
  return true;

  // if (confirm) {
  //   const checkFriend = await Friends.findOne({
  //     where: { sender_uuid, receiver_uuid },
  //   });
  //   if (checkFriend) {
  //     throw new AppError(`Friend already added`, 400);
  //   }

  //   await Friends.create({ sender_uuid, receiver_uuid });
  //   const request = await FriendRequests.findOne({
  //     sender_uuid,
  //     receiver_uuid,
  //   });
  //   await request.destroy();
  //   return true;
  // } else {
  //   const request = await FriendRequests.findOne({
  //     sender_uuid,
  //     receiver_uuid,
  //   });
  //   await request.destroy();
  //   return false;
  // }
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

const searchFriend = async (query, uuid) => {
  const friends = [];
  const sendFriends = await Friends.findAll({
    attributes: [],
    where: {
      [Op.or]: [{ sender_uuid: uuid }, { receiver_uuid: uuid }],
    },
    include: [
      {
        model: User,
        where: {
          uuid: {
            [Op.ne]: uuid,
          },
          [Op.and]: {
            name: {
              [Op.like]: "%" + query.name + "%",
            },
          },
        },
        attributes: ["name", "avatar", "uuid"],
        as: "sender",
      },
    ],
  });
  friends.push(...sendFriends);
  const receivedFriends = await Friends.findAll({
    attributes: [],
    where: {
      [Op.or]: [{ sender_uuid: uuid }, { receiver_uuid: uuid }],
    },
    include: [
      {
        model: User,
        where: {
          uuid: {
            [Op.ne]: uuid,
          },
          // name: {
          //   [Op.like]: query.name,
          // },
          [Op.and]: {
            name: {
              [Op.like]: "%" + query.name + "%",
            },
          },
        },
        attributes: ["name", "avatar", "uuid"],
        as: "receiver",
      },
    ],
  });
  friends.push(...receivedFriends);

  return friends;
};

module.exports = {
  sendFriendRequest,
  deleteFriend,
  responseFriendRequest,
  searchFriend,
};
