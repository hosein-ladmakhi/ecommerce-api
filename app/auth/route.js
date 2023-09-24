const express = require("express");
const { signIn, signUp } = require("./controller");
const { validate } = require("../validationMiddleware");
const { signInValidation, signUpValidation } = require("./validation");
const { multerUploader } = require("../multerMiddleware");
const router = express.Router();

router.post("/signIn", validate(signInValidation), signIn);
router.post(
  "/signUp",
  multerUploader.single("profile"),
  validate(signUpValidation),
  signUp
);
module.exports = router;
