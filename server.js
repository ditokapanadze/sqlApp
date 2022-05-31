const app = require("./app");

const express = require("express");

const { sequelize, User, Post } = require("./src/models");
require("dotenv").config();

const port = process.env.PORT || 8000;

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
