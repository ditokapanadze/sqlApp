require("dotenv").config();
const app = require("./app");
const logger = require("./src/logger/logger");
const { sequelize, User, Post } = require("./src/models");
require("./src/utils/eventEmitter");

const port = process.env.PORT || 8000;

console.log(process.env.NODE_ENV);

const main = async () => {
  app.listen(port, () => {
    console.log(`server running on ${port}`);
    //postgres connection
    sequelize
      .authenticate()
      .then(() => logger.info("DB connected"))
      .catch((err) => {
        console.error("Unable to connect to the DB:", err);
      });
  });
};

main();
