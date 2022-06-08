"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Friends extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "sender_uuid",
        as: "sender",
      });
      this.belongsTo(models.User, {
        foreignKey: "receiver_uuid",
        as: "receiver",
      });
    }
  }
  Friends.init(
    {
      sender_uuid: DataTypes.STRING,
      receiver_uuid: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Friends",
      tableName: "friends",
    },
  );
  return Friends;
};
