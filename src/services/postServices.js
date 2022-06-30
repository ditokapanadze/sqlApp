const AppError = require("../utils/appError");
const { Post, Hashtag, User, PostLike } = require("../models");

const { Op } = require("sequelize");
const post = require("../models/post");

const createPost = async (postData, uuid) => {
  const { title, description, hashtags } = postData;

  let post = await Post.create({ title, description, author_uuid: uuid });

  if (hashtags.length < 0) return post;

  await Hashtag.create({
    hashtag_1: hashtags[0],
    hashtag_2: hashtags[1] ? hashtags[1] : null,
    hashtag_3: hashtags[2] ? hashtags[2] : null,
    post_uuid: post.uuid,
  });
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

const getAll = async (query) => {
  const { limit, page } = query;
  console.log(typeof limit);
  if (!limit && !page) {
    const posts = await Post.findAndCountAll({ include: "user" });
    if (post.length < 1) throw new AppError("no posts found", 400);
    return posts;
  }
  const posts = await Post.findAndCountAll({
    limit: limit * 1,
    offset: limit * page,
    include: [
      { model: User, as: "user" },
      { model: PostLike, as: "likes" },
    ],
  });
  return posts;
};

const getPosts = async (uuid) => {
  const posts = await Post.findAll({ where: { author_uuid: uuid } });
  if (post.length < 1) throw new AppError("no posts found", 400);

  return posts;
};
const singlePost = async (uuid) => {
  let posts = await Post.findOne({
    where: { uuid: uuid },
    include: [{ model: Hashtag, as: "hashtags" }],
  });

  if (!post) throw new AppError("no posts found", 400);

  return posts;
};

const SingleHashtag = async (hashtag) => {
  const posts = await Post.findAll({
    include: [
      {
        model: Hashtag,
        where: {
          [Op.or]: [
            { hashtag_1: hashtag },
            { hashtag_2: hashtag },
            { hashtag_2: hashtag },
          ],
        },
        as: "hashtags",
      },
    ],
  });
  return posts;
};

const SimilarPosts = async (hashtag1, hashtag2, hashtag3) => {
  const similarPosts = [];
  const posts = await Post.findAll({
    include: [
      {
        model: Hashtag,
        where: {
          [Op.or]: [
            { hashtag_1: hashtag1 },
            { hashtag_2: hashtag1 },
            { hashtag_3: hashtag1 },
          ],
          [Op.and]: {
            [Op.or]: [
              { hashtag_1: hashtag2 },
              { hashtag_2: hashtag2 },
              { hashtag_3: hashtag2 },
            ],
          },
          [Op.and]: {
            [Op.or]: [
              { hashtag_1: hashtag3 },
              { hashtag_2: hashtag3 },
              { hashtag_3: hashtag3 },
            ],
          },
        },
        as: "hashtags",
      },
    ],
  });
  similarPosts.push(...posts);
  if (similarPosts.length < 4) {
    const posts = await Post.findAll({
      include: [
        {
          model: Hashtag,
          where: {
            [Op.or]: [
              { hashtag_1: hashtag1 },
              { hashtag_2: hashtag1 },
              { hashtag_3: hashtag1 },
            ],
            [Op.and]: {
              [Op.or]: [
                { hashtag_1: hashtag2 },
                { hashtag_2: hashtag2 },
                { hashtag_3: hashtag2 },
              ],
            },
          },
          as: "hashtags",
        },
      ],
    });
    similarPosts.push(...posts);
  }
  if (similarPosts.length < 4) {
    const posts = await Post.findAll({
      include: [
        {
          model: Hashtag,
          where: {
            [Op.or]: [
              { hashtag_1: hashtag1 },
              { hashtag_2: hashtag1 },
              { hashtag_3: hashtag1 },
            ],
          },
          as: "hashtags",
        },
      ],
    });
    similarPosts.push(...posts);
  }
  return similarPosts;
};

module.exports = {
  createPost,
  deletePost,
  updatePost,
  SingleHashtag,
  getAll,

  getPosts,
  singlePost,
  SimilarPosts,
};
