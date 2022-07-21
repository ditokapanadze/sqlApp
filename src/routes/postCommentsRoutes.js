const router = require("express").Router();
const {
  createComment,
  editComment,
  deleteComment,
} = require("../controllers/postCommentsController");
const requireUser = require("../middlewares/requireUser");

router.post("/:uuid", requireUser, createComment);
router.put("/:uuid", requireUser, editComment);
router.delete("/:uuid", requireUser, deleteComment);

module.exports = router;
