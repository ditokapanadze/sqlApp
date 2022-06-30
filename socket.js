const { Server } = require("socket.io");

let users = [];

const addUser = (uuid, socketId) => {
  !users.some((user) => user.uuid === uuid) && users.push({ uuid, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => socketId !== user.socketId);
};

const getUser = (uuid) => {
  return users.find((user) => user.uuid === uuid);
};

const socket = (server) => {
  try {
    const io = new Server(server, {
      cors: { origin: "*" },
    });

    io.on("connect", (socket) => {
      console.log(`user joined with socketId ${socket.id}`);
      socket.on("addUser", (uuid) => {
        addUser(uuid, socket.id);
        console.log(users);
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
