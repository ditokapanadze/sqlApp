const router = require("express").Router();
const { upload } = require("../controllers/uploadController");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/", verifyToken, upload);

module.exports = router;
