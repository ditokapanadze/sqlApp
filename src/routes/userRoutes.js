const router = require("express").Router();
const {
  searchUser,
  getAll,
  resetRequest,
  passwordReset,
  changeAvatar,
  getUser,
} = require("../controllers/userControllers");

const requireUser = require("../middlewares/requireUser");
router.get("/", searchUser);
// get logged in user
router.get("/getuser", requireUser, getUser);
router.get("/getall", getAll);
router.get("/resetrequest/:email", resetRequest);
router.put("/passwordreset/:token", passwordReset);
router.put("/changeavatar", requireUser, changeAvatar);

module.exports = router;
