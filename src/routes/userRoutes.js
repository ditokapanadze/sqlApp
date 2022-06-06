const router = require("express").Router();
const {
  searchUser,
  getAll,
  resetRequest,
  passwordReset,
} = require("../controllers/userControllers");
const { validatorMiddleware } = require("../middlewares/validatoMiddleware");
const { postValidation } = require("../validations/postValidation");
const verifyToken = require("../middlewares/authMiddleware");

// put "/api/v1/posts/:uuid"
router.get("/", searchUser);
router.get("/getall", getAll);
router.get("/resetrequest/:email", resetRequest);
router.put("/passwordreset/:token", passwordReset);
module.exports = router;
