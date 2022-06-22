const router = require("express").Router();
const {
  register,
  login,
  verification,
  verificationReq,
  deleteSessionHandler,
} = require("../controllers/authController");
const { registerValidation } = require("../validations/registerValidation");
const { loginValidation } = require("../validations/loginValidation");
const { validatorMiddleware } = require("../middlewares/validatoMiddleware");
const requireUser = require("../middlewares/requireUser");
const passport = require("passport");

router.post("/register", validatorMiddleware(registerValidation), register);
// router.get("/session", requireUser, getSessionHandler);
router.delete("/session", requireUser, deleteSessionHandler);

router.post("/login", validatorMiddleware(loginValidation), login);
router.get("/verification/:token", verification);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);

router.get(
  "google/callback",

  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  },
);
// resend verifications mail
router.get("/verificationrequest/:uuid", verificationReq);

module.exports = router;
