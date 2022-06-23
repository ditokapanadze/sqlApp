"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("hashtags", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hashtag_1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hashtag_2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      hashtag_3: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      post_uuid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("hashtags");
  },
};
