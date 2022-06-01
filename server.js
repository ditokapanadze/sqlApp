require("dotenv").config();
const app = require("./app");

const { sequelize, User, Post } = require("./src/models");

const port = process.env.PORT || 8000;

console.log(process.env.NODE_ENV);

const main = async () => {
  app.listen(port, () => {
    console.log(`server running on ${port}`);
    //postgres connection
    sequelize
      .authenticate()
      .then(() => console.log("DB connected"))
      .catch((err) => {
        console.error("Unable to connect to the DB:", err);
      });
  });
};

main();
