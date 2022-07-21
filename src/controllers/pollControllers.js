const {
  createPoll,
  getAll,
  getPoll,
  votePoll,
  deletePoll,
  freeze,
  getSinglePoll,
} = require("../services/pollServices.js");

exports.createPoll = async (req, res) => {
  const uuid = req.user.uuid;
  const pollData = req.body;
  const { poll, answers } = await createPoll(uuid, pollData);

  res.status(200).json({ poll, answers });
};

exports.getAll = async (req, res) => {
  const poll = await getAll();

  res.status(200).json(poll);
};

exports.getPoll = async (req, res) => {
  const uuid = req.user.uuid;
  const poll = await getPoll(uuid);

  res.status(200).json(poll);
};

exports.getSinglePoll = async (req, res) => {
  const uuid = req.params.uuid;
  const poll = await getSinglePoll(uuid);

  res.status(200).json(poll);
};

exports.votePoll = async (req, res) => {
  const userUuid = req.user.uuid;
  const { poll, answer } = req.params;

  const checkVote = await votePoll(userUuid, poll, answer);

  res.status(200).json(checkVote);
};

exports.deletePoll = async (req, res) => {
  const userUuid = req.user.uuid;
  const pollUuid = req.params.uuid;

  const poll = await deletePoll(userUuid, pollUuid);

  res.status(200).json({ msg: "poll deleted" });
};

exports.freeze = async (req, res) => {
  const userUuid = req.user.uuid;
  const pollUuid = req.params.uuid;

  const poll = await freeze(userUuid, pollUuid);

  res.status(200).json(poll);
};
