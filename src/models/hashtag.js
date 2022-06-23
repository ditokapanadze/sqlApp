"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hashtags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      this.belongsTo(Post, {
        foreignKey: "post_uuid",
        targetKey: "uuid",
        as: "post",
      });
    }
  }
  Hashtags.init(
    {
      hashtag_1: { type: DataTypes.STRING, allowNull: true },
      hashtag_2: { type: DataTypes.STRING, allowNull: true },
      hashtag_3: { type: DataTypes.STRING, allowNull: true },
      post_uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "hashtags",
      modelName: "Hashtag",
    },
  );
  return Hashtags;
};
