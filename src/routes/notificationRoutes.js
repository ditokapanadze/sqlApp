const {
  seenNotification,
  getNotifications,
} = require("../controllers/notificationController");
const requireUser = require("../middlewares/requireUser");

const router = require("express").Router();

router.get("/", requireUser, getNotifications);
router.put("/:uuid", requireUser, seenNotification);

module.exports = router;
