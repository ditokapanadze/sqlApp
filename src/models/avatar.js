"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Avatar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Avatar.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      path: { type: DataTypes.STRING, allowNull: false },
      content_type: { type: DataTypes.STRING, allowNull: false },
      original_filename: { type: DataTypes.STRING, allowNull: false },
      author_uuid: { type: DataTypes.UUIDV4, allowNull: false },
      uploaded: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "avatar",
      modelName: "Avatar",
    },
  );
  return Avatar;
};
