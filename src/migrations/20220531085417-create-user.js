"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("users");
  },
};
