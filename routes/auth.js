const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

router.post("/signUp", authController.signUp);
router.post("/login", authController.login);
exports.router = router;
