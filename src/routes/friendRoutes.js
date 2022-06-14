const {
  responseFriendRequest,
  sendFriendRequest,
  deleteFriend,
} = require("../controllers/friendController");

const router = require("express").Router();
const verifyToken = require("../middlewares/authMiddleware");
router.post("/friendrequest/:uuid", verifyToken, sendFriendRequest);
router.post("/friendsconfrim", verifyToken, responseFriendRequest);
router.delete("/:uuid", verifyToken, deleteFriend);

module.exports = router;
