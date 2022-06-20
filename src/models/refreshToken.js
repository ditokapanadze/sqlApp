"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class refreshToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: "owner_uuid",
        targetKey: "uuid",
        as: "refreshTokens",
      });
    }
  }
  refreshToken.init(
    {
      owner_uuid: DataTypes.UUID,
      uuid: DataTypes.UUID,
      refreshToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "RefreshToken",
      tableName: "refreshTokens",
    },
  );
  return refreshToken;
};
