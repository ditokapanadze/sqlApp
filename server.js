require("dotenv").config();
const server = require("./app");
const logger = require("./src/logger/logger");
const { sequelize, User, Post } = require("./src/models");
const process = require("process");
require("./src/utils/eventEmitter");

const port = process.env.PORT || 8000;

console.log(process.env.NODE_ENV);
console.log("asd");
const main = async () => {
  server.listen(port, () => {
    console.log(`server running  ${port}`);
    //postgres connection
    sequelize
      .authenticate()
      .then(() => logger.info("DB ds connected"))
      .catch((err) => {
        console.error("Unable to connect to the DB:", err);
      });
  });
};

main();
