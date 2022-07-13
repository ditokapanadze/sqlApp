const router = require("express").Router();
const {
  createPoll,
  getAll,
  getPoll,
  votePoll,
} = require("../controllers/pollControllers");
const requireUser = require("../middlewares/requireUser");

router.post("/", requireUser, createPoll);
// get ll posts
router.get("/", requireUser, getAll);
// get posts by user uuid
router.get("/:uuid", requireUser, getPoll);
// vote
router.put("/:poll/:answer", requireUser, votePoll);
module.exports = router;
