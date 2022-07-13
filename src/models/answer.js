"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Poll }) {
      this.belongsTo(Poll, {
        foreignKey: "poll_uuid",
        targetKey: "uuid",
        as: "answers",
      });
    }
  }
  Answer.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      poll_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      // voteCount: {
      //   type: DataTypes.VIRTUAL,
      // },
    },
    {
      sequelize,
      tableName: "answers",
      modelName: "Answer",
    },
  );
  return Answer;
};
