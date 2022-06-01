const AppError = require("../utils/appError");
const { Post } = require("../models");
const { User } = require("../models");

const createPost = async (postData, user) => {
  const { title, description } = postData;

  const post = await Post.create({ title, description, userId: user.id });
  return post;
};
const deletePost = async (postUUID, user) => {
  const post = await Post.findOne({
    where: { uuid: postUUID, userId: user.id },
  });
  if (!post) throw new AppError("post not found", 404);
  const response = await post.destroy();
  if (!response) throw new AppError("can not delete post", 400);
  return true;
};
const updatePost = async (postData, postUUID, user) => {
  const { title, description } = postData;
  console.log(title);
  console.log(description);
  const post = await Post.findOne({
    where: { userID: user.id, uuid: "869be2d1-d50d-4461-96fe-81c9909868e9" },
  });
  if (!post) throw new AppError("you can edit only your posts", 404);

  post.set({
    ...(description && { description }),
    ...(title && { title }),
  });

  await post.save();
  return post;
};

module.exports = {
  createPost,
  deletePost,
  updatePost,
};
