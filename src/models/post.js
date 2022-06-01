"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
    }
    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined };
    }
  }
  Post.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://m.media-amazon.com/images/I/61QiUmahC6L._AC_SY741_.jpg",
      },
    },
    {
      sequelize,
      tableName: "posts",
      modelName: "Post",
    },
  );
  return Post;
};
