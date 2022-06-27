const router = require("express").Router();
const authRoutes = require("./authRoutes");
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");

const friendRoutes = require("./friendRoutes");
const uploadRoutes = require("./uploadRoutes");

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/user", userRoutes);
// todo rename upload to media
router.use("/upload", uploadRoutes);
router.use("/friend", friendRoutes);

module.exports = router;
