const router = require("express").Router();
const {
  searchUser,
  getAll,
  resetRequest,
  passwordReset,
  responseFriendRequest,
  sendFriendRequest,
} = require("../controllers/userControllers");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/", searchUser);
router.get("/getall", getAll);
router.get("/resetrequest/:email", resetRequest);
router.put("/passwordreset/:token", passwordReset);

module.exports = router;
