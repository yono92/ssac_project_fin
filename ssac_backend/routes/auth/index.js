var express = require("express");
var router = express.Router();
const authController = require("../../controllers/auth/authController");
//회원가입
router.post("/signup", authController.signup);
//로그인
router.post("/signin", authController.signin);

module.exports = router;
