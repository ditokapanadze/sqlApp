const router = require("express").Router();
const {
  createPoll,
  getAll,
  getPoll,
  votePoll,
  deletePoll,
  freeze,
  getSinglePoll,
} = require("../controllers/pollControllers");
const requireUser = require("../middlewares/requireUser");

router.post("/", requireUser, createPoll);
// get all poll
router.get("/", requireUser, getAll);
// get posts by user uuid
router.get("/user/:uuid", requireUser, getPoll);
// get poll by uuid
router.get("/:uuid", requireUser, getSinglePoll);

router.delete("/:uuid", requireUser, deletePoll);
// stop voting
router.put("/freeze/:uuid", requireUser, freeze);
router.put("/:poll/:answer", requireUser, votePoll);
module.exports = router;
