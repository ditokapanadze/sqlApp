const router = require("express").Router();
const {
  searchUser,
  getAll,
  resetRequest,
  passwordReset,
  changeAvatar,
} = require("../controllers/userControllers");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/", searchUser);
router.get("/getall", getAll);
router.get("/resetrequest/:email", resetRequest);
router.put("/passwordreset/:token", passwordReset);
router.put("/changeavatar", verifyToken, changeAvatar);

module.exports = router;
