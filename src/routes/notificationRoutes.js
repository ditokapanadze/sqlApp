const { seenNotification } = require("../controllers/notificationController");
const requireUser = require("../middlewares/requireUser");

const router = require("express").Router();

router.put("/:uuid", requireUser, seenNotification);
module.exports = router;
