"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("avatars", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      content_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      original_filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      author_uuid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      uploaded: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.dropTable("avatars");
  },
};
