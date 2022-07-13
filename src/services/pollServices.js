const AppError = require("../utils/appError");
const {
  Post,
  Hashtag,
  Notification,
  Poll,
  Answer,
  Vote,
} = require("../models");

const { Sequelize, Op } = require("sequelize");
const { uuid } = require("uuidv4");

const createPoll = async (uuid, pollData) => {
  console.log(uuid);
  console.log(pollData);

  const poll = await Poll.create({
    creator_uuid: uuid,
    question: pollData.question,
  });

  if (!poll) throw new AppError(`cant create poll`, 401);

  let answers = await Promise.all(
    pollData.answers.map(async (answer) => {
      let res = await Answer.create({
        poll_uuid: poll.uuid,
        content: answer,
      });
      return res;
    }),
  );
  console.log(answers);
  if (!answers) throw new AppError(`cant create poll`, 401);

  return { poll, answers };
};

const getAll = async () => {
  const poll = await Poll.findAll({
    include: [{ model: Answer, as: "answers" }],
  });

  return poll;
};

const getPoll = async (uuid) => {
  const poll = await Poll.findAll({
    where: {
      creator_uuid: uuid,
    },
    include: [
      {
        model: Answer,
        as: "answers",
        attributes: [
          "uuid",
          [
            Sequelize.literal(
              "(SELECT COUNT(*) FROM votes WHERE answer_uuid=`answers.uuid`)",
            ),
            "voteCount",
          ],
        ],
      },
      { model: Vote, as: "votes" },
    ],
  });
  return poll;
};

const votePoll = async (userUuid, poll, answer) => {
  const checkVote = await Vote.findOne({
    where: { answer_uuid: answer, poll_uuid: poll, voter_uuid: userUuid },
  });
  if (checkVote) {
    await checkVote.destroy();
    return;
  }

  const changeVote = await Vote.findOne({
    where: {
      poll_uuid: poll,
      voter_uuid: userUuid,
    },
  });
  if (changeVote) {
    changeVote.answer_uuid = answer;
    const vote = await changeVote.save();
    return vote;
  }

  const vote = await Vote.create({
    answer_uuid: answer,
    poll_uuid: poll,
    voter_uuid: userUuid,
  });
  return vote;
};

module.exports = { createPoll, getAll, getPoll, votePoll };
