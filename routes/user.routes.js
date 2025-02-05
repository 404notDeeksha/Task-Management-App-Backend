const express = require("express");
const router = express.Router();

const userController = require("../controllers/User.controller");

router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);

module.exports = router;
