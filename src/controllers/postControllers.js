const {
  createPost,
  deletePost,
  updatePost,
} = require("../services/postServices.js");

exports.createPost = async (req, res, next) => {
  const postData = req.body;
  const user = req.user;
  const post = await createPost(postData, user);

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
  //   console.log(postUUID);
  const post = await updatePost(postData, postUUID, user);

  res.status(200).json({ post, msg: "post updated" });
};
