const router = require("express").Router();
const authRoutes = require("./authRoutes");
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");

const friendRoutes = require("./friendRoutes");
const uploadRoutes = require("./uploadRoutes");
const notificationRoutes = require("./notificationRoutes");
const likeRoutes = require("./likeRoutes");
const pollRoutes = require("./pollRoutes");

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/user", userRoutes);
// todo rename upload to media
router.use("/upload", uploadRoutes);
router.use("/friend", friendRoutes);
router.use("/notification", notificationRoutes);
router.use("/like", likeRoutes);
router.use("/poll", pollRoutes);

module.exports = router;
