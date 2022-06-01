const router = require("express").Router();
const {
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/postControllers");
const { validatorMiddleware } = require("../middlewares/validatoMiddleware");
const { postValidation } = require("../validator/postValidation");
const verifyToken = require("../middlewares/authMiddleware");

router.post(
  "/createpost",
  verifyToken,
  postValidation(),
  validatorMiddleware,
  createPost,
);
router.delete("/deletepost/:uuid", verifyToken, deletePost);
router.put("/updatepost/:uuid", verifyToken, updatePost);
module.exports = router;
