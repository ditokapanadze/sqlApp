const { Server } = require("socket.io");
const { User, Friends } = require("./src/models");
let client = require("./src/config/redis");

let onlineUSers = [];
const getOnlineUSers = async () => {
  const results = await client.get("onlineUSers");
  return JSON.parse(results);
};
const addUser = async (uuid, socketId) => {
  onlineUSers = onlineUSers.filter((user) => {
    return user.socketId != socketId;
  });

  onlineUSers.push({ uuid, socketId });
  console.log("esaa realuri", onlineUSers);
  client.set("onlineUSers", JSON.stringify(onlineUSers));
};

const removeUser = async (socketId) => {
  try {
    onlineUSers = await getOnlineUSers();
  } catch (e) {
    console.log(e);
  }
  console.log("es modis removidan", onlineUSers);
  console.log("removidan", socketId);

  client.set(
    "onlineUSers",
    JSON.stringify(onlineUSers.filter((user) => socketId !== user.socketId)),
  );
};

const getUser = (uuid) => {
  return users.find((user) => user.uuid === uuid);
};

const socket = (server) => {
  try {
    const io = new Server(server, {
      cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
      socket.on("addUser", async (uuid) => {
        let friends = [];

        try {
          onlineUSers = await getOnlineUSers();
        } catch (e) {
          console.log(e);
        }

        addUser(uuid, socket.id);

        const user = await User.findOne({
          where: {
            uuid,
          },
          include: [
            { model: Friends, as: "receivedFriends" },
            { model: Friends, as: "sentFriends" },
          ],
        });

        user.sentFriends.forEach((friend) => {
          friends.push(friend.receiver_uuid);
        });

        user.receivedFriends.forEach((friend) => {
          friends.push(friend.sender_uuid);
        });

        const onlineFriends = [];

        onlineUSers.forEach((user) => {
          friends.forEach((friend) => {
            user.uuid === friend && onlineFriends.push(user);
          });
        });

        onlineFriends.forEach((friends) => {
          io.to(friends.socketId).emit("friendJoined", {
            uuid,
          });
        });

        io.to(socket.id).emit("onlineFriends", {
          onlineFriends,
        });
      });

      socket.on("disconnect", () => {
        removeUser(socket.id);
      });

      socket.on("sendNotification", ({ senderUuid, receiverUuid, text }) => {
        const user = getUser(receiverUuid);
        io.to(user.socketId).emit("getNotification", {
          senderUuid,
          text,
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = socket;
