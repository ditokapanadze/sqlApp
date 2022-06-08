const router = require("express").Router();
const { upload } = require("../controllers/uploadController");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/", verifyToken, upload);

module.exports = router;
