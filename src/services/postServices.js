const AppError = require("../utils/appError");
const { Post } = require("../models");

const post = require("../models/post");

const createPost = async (postData, uuid) => {
  const { title, description } = postData;

  const post = await Post.create({ title, description, author_uuid: uuid });
  return post;
};
const deletePost = async (postUUID, user) => {

  const post = await Post.findOne({
    where: { uuid: postUUID, author_uuid: user.uuid },
  });
  if (!post) throw new AppError("post not found", 404);
  const response = await post.destroy();
  if (!response) throw new AppError("can not delete post", 400);
  return true;
};
const updatePost = async (postData, uuid, user) => {
  const { title, description } = postData;
  console.log(
    "333c7c45-fad9-44c2-9b41-dd12acb7f08d" ===
      "333c7c45-fad9-44c2-9b41-dd12acb7f08d",
  );
  console.log("333c7c45-fad9-44c2-9b41-dd12acb7f08d");

  // console.log(user.uuid);
  const post = await Post.findOne({
    // ეს შესაცვლელია
    where: {
      author_uuid: user.uuid,
      uuid,
    },
  });

  if (!post) throw new AppError("you can edit only your posts", 404);

  post.set({
    ...(description && { description }),
    ...(title && { title }),
  });

  await post.save();
  return post;
};

const getAll = async () => {
  const posts = await Post.findAll({ include: "user" });
  if (post.length < 1) throw new AppError("no posts found", 400);

  return posts;
};
const photoUpload = async (x) => {

};
const getPosts = async (uuid) => {

  const posts = await Post.findAll({ where: { author_uuid: uuid } });
  if (post.length < 1) throw new AppError("no posts found", 400);
  return posts;
};
const singlePost = async (uuid) => {
  const posts = await Post.findOne({ where: { uuid: uuid } });

  if (!post) throw new AppError("no posts found", 400);
  return posts;
};

module.exports = {
  createPost,
  deletePost,
  updatePost,
  getAll,
  photoUpload,
  getPosts,
  singlePost,
};
