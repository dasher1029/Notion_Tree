// ExpressServer/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// 🔹 라우터가 컨트롤러와 URL 경로를 연결
router.get("/login", authController.login);
router.get("/callback", authController.callback);

module.exports = router;