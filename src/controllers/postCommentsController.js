const {
  createComment,
  deleteComment,
  editComment,
} = require("../services/postCommentsServices.js");

exports.createComment = async (req, res) => {
  const userUuid = req.user.uuid;
  const postUuid = req.params.uuid;
  const replyUuid = req.query.replyuuid || null;
  const content = req.body.content;
  const comment = await createComment(postUuid, userUuid, replyUuid, content);

  res.status(200).json(comment);
};

exports.editComment = async (req, res) => {
  const userUuid = req.user.uuid;
  const commentUuid = req.params.uuid;
  const content = req.body.content;

  const comment = await editComment(commentUuid, userUuid, content);

  res.status(200).json(comment);
};

exports.deleteComment = async (req, res) => {
  const userUuid = req.user.uuid;
  const commentUuid = req.params.uuid;

  const comment = await deleteComment(commentUuid, userUuid);

  res.status(201).json({ msg: "comment deleted" });
};
