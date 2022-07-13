"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Poll extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Answer, Vote }) {
      this.hasMany(Answer, {
        foreignKey: "poll_uuid",
        sourceKey: "uuid",
        as: "answers",
      });
      this.hasMany(Vote, {
        foreignKey: "poll_uuid",
        sourceKey: "uuid",
        as: "votes",
      });
    }
  }
  Poll.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      creator_uuid: {
        type: DataTypes.UUID,

        allowNull: false,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "polls",
      modelName: "Poll",
    },
  );
  return Poll;
};
