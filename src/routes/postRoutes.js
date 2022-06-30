const router = require("express").Router();
const { route } = require("express/lib/router");
const {
  createPost,
  deletePost,
  updatePost,
  getAll,
  photoUpload,
  getPosts,
  singlePost,
  SingleHashtag,
  SimilarPosts,
} = require("../controllers/postControllers");
const requireUser = require("../middlewares/requireUser");

// create single post
// post /api/v1/posts
router.post("/", requireUser, createPost);

// delete single post
// delete "/api/v1/posts/:uuid"
router.delete("/:uuid", requireUser, deletePost);

// put "/api/v1/posts/:uuid"
router.put("/:uuid", requireUser, updatePost);

// get all post with users, or paginate if parameters exist
router.get("/", getAll);
//get all posts with user uuid
router.get("/getposts", requireUser, getPosts);

// single hashtag search
router.get("/hashtag", SingleHashtag);
router.get("/hashtags", SimilarPosts);
router.post("/photoupload", photoUpload); // get single post by uuid
router.get("/:uuid", singlePost);
module.exports = router;
