const {
  responseFriendRequest,
  sendFriendRequest,
  deleteFriend,
} = require("../controllers/friendController");
const requireUser = require("../middlewares/requireUser");

const router = require("express").Router();

router.post("/friendrequest/:uuid", requireUser, sendFriendRequest);
router.post("/friendsconfrim", requireUser, responseFriendRequest);
router.delete("/:uuid", requireUser, deleteFriend);

module.exports = router;
