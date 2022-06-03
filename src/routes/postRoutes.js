const router = require("express").Router();
const {
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/postControllers");
const { validatorMiddleware } = require("../middlewares/validatoMiddleware");
const { postValidation } = require("../validations/postValidation");
const verifyToken = require("../middlewares/authMiddleware");

// create single post
// post /api/v1/posts
router.post("/", verifyToken, validatorMiddleware(postValidation), createPost);

// delete single post
// delete "/api/v1/posts/:uuid"
router.delete("/:uuid", verifyToken, deletePost);

// put "/api/v1/posts/:uuid"
router.put("/:uuid", verifyToken, updatePost);
module.exports = router;
