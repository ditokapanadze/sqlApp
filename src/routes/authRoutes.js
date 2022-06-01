const router = require("express").Router();
const { register, login } = require("../controllers/authController");
const {
  registerValidation,
  loginValidation,
} = require("../validator/authValidation");
const { validatorMiddleware } = require("../middlewares/validatoMiddleware");

router.post("/register", registerValidation(), validatorMiddleware, register);
router.post("/login", loginValidation(), validatorMiddleware, login);

module.exports = router;
