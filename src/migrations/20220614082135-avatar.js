"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "avatar", {
      type: Sequelize.STRING,
      defaultValue:
        "https://image.shutterstock.com/image-vector/creative-vector-illustration-default-avatar-260nw-779277895.jpg",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users", "avatar");
  },
};
