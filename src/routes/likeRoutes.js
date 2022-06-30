const { sendLike } = require("../controllers/likeController");
const requireUser = require("../middlewares/requireUser");

const router = require("express").Router();

router.put("/:uuid/:type", requireUser, sendLike);

module.exports = router;
