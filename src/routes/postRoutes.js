const router = require("express").Router();
const {
  createPost,
  deletePost,
  updatePost,
  getAll,
  photoUpload,
  getPosts,
  singlePost,
} = require("../controllers/postControllers");
const { validatorMiddleware } = require("../middlewares/validatoMiddleware");
const { postValidation } = require("../validations/postValidation");
const verifyToken = require("../middlewares/authMiddleware");
const requireUser = require("../middlewares/requireUser");

// create single post
// post /api/v1/posts
router.post("/", requireUser, createPost);

// delete single post
// delete "/api/v1/posts/:uuid"
router.delete("/:uuid", requireUser, deletePost);

// put "/api/v1/posts/:uuid"
router.put("/:uuid", requireUser, updatePost);

// get all post with users
router.get("/", getAll);
//get all posts with user uuid
router.get("/getposts", verifyToken, getPosts);
// get single post by uuid
router.get("/:uuid", singlePost);
router.post("/photoupload", photoUpload);
module.exports = router;
