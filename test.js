let client = require("./src/config/redis");

let users = [
  { online: { id: "dd", socketId: "asd" } },
  { online: { id: "dd", socketId: "asd" } },
];

const onlineUSers = [
  {
    uuid: "38278aas9732894",
    socketId: "23234asd",
  },
  {
    uuid: "0f3552b1-85f8-4a75-964a-247b378cb170",
    socketId: "23234aa",
  },
  {
    uuid: "3827897328asdasdads94",
    socketId: "23234caasassd",
  },
];
client.setex("onlineUSers", 50000, JSON.stringify(onlineUSers));

client.get("onlineUSers", (error, x) => {
  if (error) {
    console.log(error);
  }
  if (x) {
    console.log(x);
    console.log(JSON.parse(x));
  }
});
