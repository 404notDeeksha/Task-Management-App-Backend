const express = require("express");
const router = express.Router();

const userController = require("../controllers/User.controller");
const { validate, signupSchema, loginSchema } = require("../middleware/validation");

router.post("/signup", validate(signupSchema), userController.signupUser);
router.post("/login", validate(loginSchema), userController.loginUser);
router.post("/logout", userController.logoutUser);

module.exports = router;
