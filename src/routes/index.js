const router = require("express").Router();
const authRoutes = require("./authRoutes");
const postRoutes = require("./postRoutes");
const userRoutes = require("./userRoutes");

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/user", userRoutes);
module.exports = router;
