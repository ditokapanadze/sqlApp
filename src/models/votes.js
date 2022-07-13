"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({}) {
      // define association here
    }
  }
  Votes.init(
    {
      uuid: {
        allowNull: null,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      poll_uuid: {
        allowNull: null,
        type: DataTypes.UUID,
      },

      answer_uuid: {
        allowNull: null,
        type: DataTypes.UUID,
      },
      voter_uuid: {
        allowNull: null,
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "Vote",
      tableName: "votes",
    },
  );
  return Votes;
};
