const router = require("express").Router();
const {
  searchUser,
  getAll,
  resetRequest,
  passwordReset,
  changeAvatar,
} = require("../controllers/userControllers");
const verifyToken = require("../middlewares/authMiddleware");
const requireUser = require("../middlewares/requireUser");
router.get("/", searchUser);
router.get("/getall", getAll);
router.get("/resetrequest/:email", resetRequest);
router.put("/passwordreset/:token", passwordReset);
router.put("/changeavatar", requireUser, changeAvatar);

module.exports = router;
