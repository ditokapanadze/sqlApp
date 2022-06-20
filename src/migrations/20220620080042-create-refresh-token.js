"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("refreshTokens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      owner_uuid: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      refreshToken: {
        type: Sequelize.STRING,
        allowNull: true,
        default: null,
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
    await queryInterface.dropTable("refreshTokens");
  },
};
