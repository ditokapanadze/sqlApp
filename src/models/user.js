"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({
      Post,
      RefreshToken,
      User,
      Media,
      FriendRequests,
      Friends,
    }) {
      this.hasMany(Post, {
        foreignKey: "author_uuid",
        sourceKey: "uuid",
        as: "posts",
      });
      this.hasMany(Media, {
        foreignKey: "author_uuid",
        sourceKey: "uuid",
        as: "media",
      });
      this.hasMany(RefreshToken, {
        foreignKey: "owner_uuid",
        sourceKey: "uuid",
        as: "refreshTokens",
      });
      // ესენი მგონი გადასაკეთებელია
      this.belongsToMany(User, {
        through: FriendRequests,
        as: "sentRequests",
        foreignKey: "sender_uuid",
      });
      this.belongsToMany(User, {
        through: FriendRequests,
        as: "receivedRequests",
        foreignKey: "receiver_uuid",
      });
      // this.belongsToMany(User, {
      //   through: Friends,
      //   as: "sentFriends",
      //   foreignKey: "sender_uuid",
      // });
      // this.belongsToMany(User, {
      //   through: Friends,
      //   as: "receivedFriends",
      //   foreignKey: "receiver_uuid",
      // });
      this.hasMany(Friends, {
        foreignKey: "sender_uuid",
        sourceKey: "uuid",
        as: "sentFriends",
      });
      this.hasMany(Friends, {
        foreignKey: "receiver_uuid",
        sourceKey: "uuid",
        as: "receivedFriends",
      });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        password: undefined,
        refreshToken: undefined,
      };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a name" },
          notEmpty: { msg: "Name must not be empty" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      activationToken: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      tokenExpireAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetToken: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      resetTokenExpireAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { msg: "please use a valid email address" },
        },
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue:
          "https://image.shutterstock.com/image-vector/creative-vector-illustration-default-avatar-260nw-779277895.jpg",
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    },
  );
  return User;
};
