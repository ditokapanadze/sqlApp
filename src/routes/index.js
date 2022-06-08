const router = require("express").Router();
const authRoutes = require("./authRoutes");
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");
const uploadRoutes = require("./uploadRoutes");

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/user", userRoutes);
router.use("/upload", uploadRoutes);
module.exports = router;
