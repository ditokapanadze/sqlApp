const AppError = require("../utils/appError");
const {
  Post,
  Hashtag,
  Notification,
  Poll,
  Answer,
  Vote,
  User,
} = require("../models");

const { Sequelize, Op } = require("sequelize");
const { uuid } = require("uuidv4");

const createPoll = async (uuid, pollData) => {
  const poll = await Poll.create({
    creator_uuid: uuid,
    question: pollData.question,
    expiration_date: pollData.expiration_date,
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
          // [
          //   Sequelize.literal(
          //     "(SELECT voter_uuid FROM votes WHERE answer_uuid=`answers.uuid` AND poll_uuid=`poll_uuid` )",
          //   ),
          //   "voters",
          // ],
          "content",
        ],
      },
      { model: Vote, as: "votes" },
    ],
  });
  return poll;
};

const votePoll = async (userUuid, poll, answer) => {
  const checkPoll = await Poll.findOne({
    where: {
      uuid: poll,
    },
  });

  if (!checkPoll) throw new AppError(`poll not found`, 401);

  if (checkPoll.freeze) {
    throw new AppError(`voting stopped by poll creator`, 401);
  }

  let time = new Date();
  if (
    checkPoll.expiration_date &&
    checkPoll.expiration_date.getTime() < time.getTime()
  ) {
    throw new AppError(`Voting fot this poll has ended`, 401);
  }
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

const deletePoll = async (userUuid, pollUuid) => {
  const poll = await Poll.findOne({
    where: {
      uuid: pollUuid,
      creator_uuid: userUuid,
    },
  });
  if (!poll) throw new AppError(`poll not found`, 401);

  await poll.destroy();
  return;
};

const freeze = async (userUuid, pollUuid) => {
  const poll = await Poll.findOne({
    where: {
      uuid: pollUuid,
      creator_uuid: userUuid,
    },
  });

  console.log("___________________________________________");
  if (!poll) throw new AppError(`poll not found`, 401);

  poll.freeze = !poll.freeze;

  await poll.save();

  return poll;
};

const getSinglePoll = async (uuid) => {
  const poll = await Poll.findOne({
    where: {
      uuid,
    },
  });
  if (!poll) {
    throw new AppError(`poll not found`, 401);
  }
  return poll;
};

module.exports = {
  createPoll,
  getAll,
  getPoll,
  votePoll,
  deletePoll,
  freeze,
  getSinglePoll,
};
