const router = require("express").Router();
const {
  searchUser,
  getAll,
  resetRequest,
  passwordReset,
  changeAvatar,
  editInfo,
  getUser,
  changePassword,
} = require("../controllers/userControllers");

const requireUser = require("../middlewares/requireUser");
router.get("/", requireUser, searchUser);
// get logged in user
router.get("/getuser", requireUser, getUser);
router.get("/getall", getAll);
router.get("/resetrequest/:email", resetRequest);
router.put("/passwordreset/:token", passwordReset);
router.put("/changepassword", requireUser, changePassword);
router.put("/editinfo", requireUser, editInfo);
// router.put("/changeavatar", requireUser, changeAvatar);

module.exports = router;
