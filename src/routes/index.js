const router = require("express").Router();
const authRoutes = require("./authRoutes");
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");
const uploadRoutes = require("./uploadRoutes");
const friendRoutes = require("./friendRoutes");

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/user", userRoutes);
router.use("/upload", uploadRoutes);
router.use("/friend", friendRoutes);
module.exports = router;
