const express = require("express");
const router = express.Router();

const userController = require("../controllers/User.controller");

router.post("/signup", userController.signupUser);

module.exports = router;
