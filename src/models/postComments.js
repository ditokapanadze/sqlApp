"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class postComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ PostComments }) {
      this.hasMany(PostComments, {
        foreignKey: "uuid",
        sourceKey: "uuid",
        as: "reply",
      });
    }
  }
  postComments.init(
    {
      uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      author_uuid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      post_uuid: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      reply_uuid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "postComments",
      modelName: "PostComments",
    },
  );
  return postComments;
};
