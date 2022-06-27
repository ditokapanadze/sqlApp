const router = require("express").Router();
const authRoutes = require("./authRoutes");
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");

const friendRoutes = require("./friendRoutes");
const uploadRoutes = require("./uploadRoutes");
const notificationRoutes = require("./notificationRoutes");

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/user", userRoutes);
// todo rename upload to media
router.use("/upload", uploadRoutes);
router.use("/friend", friendRoutes);
router.use("/notification", notificationRoutes);

module.exports = router;
