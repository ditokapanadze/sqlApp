const router = require("express").Router();
const { upload } = require("../controllers/uploadController");

const requireUser = require("../middlewares/requireUser");

router.post("/", requireUser, upload);

module.exports = router;
