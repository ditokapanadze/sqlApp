const { Post, Hashtag, User, PostLike, PostComments } = require("../models");
const AppError = require("../utils/appError");
const createComment = async (postUuid, userUuid, replyUuid, content) => {
  const post = await Post.findOne({
    where: {
      uuid: postUuid,
    },
  });
  if (!post) {
    throw new AppError(`Post not found`, 401);
  }

  const comment = await PostComments.create({
    author_uuid: userUuid,
    post_uuid: postUuid,
    reply_uuid: replyUuid,
    content: content,
  });
  return comment;
};

const editComment = async (commentUuid, userUuid, content) => {
  const comment = await PostComments.findOne({
    where: {
      uuid: commentUuid,
      author_uuid: userUuid,
    },
  });
  if (!comment) {
    throw new AppError(`comment not found`, 401);
  }
  comment.content = content;
  await comment.save();
  return comment;
};

const deleteComment = async (commentUuid, userUuid) => {
  const comment = await PostComments.findOne({
    where: {
      uuid: commentUuid,
      author_uuid: userUuid,
    },
  });

  if (!comment) {
    throw new AppError(`comment not found`, 401);
  }

  await comment.destroy();

  return;
};

module.exports = {
  createComment,
  editComment,
  deleteComment,
};
