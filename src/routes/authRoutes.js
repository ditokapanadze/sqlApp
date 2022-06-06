const router = require("express").Router();
const {
  register,
  login,
  verification,
  verificationReq,
} = require("../controllers/authController");
const { registerValidation } = require("../validations/registerValidation");
const { loginValidation } = require("../validations/loginValidation");
const { validatorMiddleware } = require("../middlewares/validatoMiddleware");

router.post("/register", validatorMiddleware(registerValidation), register);
router.post("/login", validatorMiddleware(loginValidation), login);
router.get("/verification/:token", verification);
router.get("/verificationrequest/:uuid", verificationReq);

module.exports = router;
