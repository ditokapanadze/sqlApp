const {
  createPost,
  deletePost,
  updatePost,
  getAll,
  photoUpload,
  getPosts,
  singlePost,
} = require("../services/postServices.js");

exports.createPost = async (req, res, next) => {
  const postData = req.body;
  const uuid = req.user.uuid;

  const post = await createPost(postData, uuid);

  res.status(200).json({ post });
};
exports.deletePost = async (req, res, next) => {
  const postData = req.body;
  const { uuid } = req.params;
  const postUUID = uuid;
  const user = req.user;
  const post = await deletePost(postUUID, user);

  res.status(204).json({ msg: "post deleted" });
};
exports.updatePost = async (req, res, next) => {
  const postData = req.body;
  const { uuid } = req.params;
  const postUUID = uuid;
  const user = req.user;

  const post = await updatePost(postData, uuid, user);

  res.status(200).json({ post, msg: "post updated" });
};

exports.getAll = async (req, res, next) => {
  const posts = await getAll();

  res.status(200).json(posts);
};
exports.photoUpload = async (req, res, next) => {
  const posts = await photoUpload();

  res.status(200).json(posts);
};
exports.getPosts = async (req, res, next) => {
  const uuid = req.user.uuid;
  console.log("post controler");
  const posts = await getPosts(uuid);

  res.status(200).json(posts);
};
exports.singlePost = async (req, res, next) => {
  console.log("uuid");
  const { uuid } = req.params;

  const posts = await singlePost(uuid);

  res.status(200).json(posts);
};
