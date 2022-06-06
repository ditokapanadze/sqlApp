const router = require("express").Router();
const { searchUser, getAll } = require("../controllers/userControllers");
const { validatorMiddleware } = require("../middlewares/validatoMiddleware");
const { postValidation } = require("../validations/postValidation");
const verifyToken = require("../middlewares/authMiddleware");

// put "/api/v1/posts/:uuid"
router.get("/", searchUser);
router.get("/getall", getAll);
module.exports = router;
