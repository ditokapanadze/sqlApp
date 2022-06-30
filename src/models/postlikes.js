"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostLikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post }) {
      this.belongsTo(User, {
        foreignKey: "user_uuid",
        targetKey: "uuid",
        as: "user",
      });
      this.belongsTo(Post, {
        foreignKey: "post_uuid",
        targetKey: "uuid",
        as: "posts",
      });
    }
  }
  PostLikes.init(
    {
      user_uuid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      post_uuid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "postLikes",
      modelName: "PostLike",
    },
  );
  return PostLikes;
};
