"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Hashtag, PostLike }) {
      this.belongsTo(User, {
        foreignKey: "author_uuid",
        targetKey: "uuid",
        as: "user",
      });
      this.hasOne(Hashtag, {
        foreignKey: "post_uuid",
        sourceKey: "uuid",
        as: "hashtags",
      });
      this.hasMany(PostLike, {
        foreignKey: "post_uuid",
        sourceKey: "uuid",
        as: "likes",
      });
      // this.hasOne(Hashtag, {
      //   foreignKey: "post_uuid",
      //   targetKey: "uuid",
      //   as: "hashtags",
      // });
    }
    toJSON() {
      return { ...this.get() };
    }
  }
  Post.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://m.media-amazon.com/images/I/61QiUmahC6L._AC_SY741_.jpg",
      },
      author_uuid: {
        type: DataTypes.UUIDV4,
        allowNull: false,
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
