const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./ExpressServer/routes/authRoutes");
const notionRoutes = require("./ExpressServer/routes/notionRoutes");
const errorHandler = require("./ExpressServer/utils/errorHandler");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// 정적 파일
app.use(express.static("Client"));

// 라우터 연결
app.use(authRoutes);
app.use(notionRoutes);

// 에러 핸들링
app.use(errorHandler);

const https = require("https");

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

if (process.env.SSL_CERT && process.env.SSL_KEY) {
  const options = {
    key: process.env.SSL_KEY.replace(/\\n/g, "\n"),
    cert: process.env.SSL_CERT.replace(/\\n/g, "\n"),
  };

  https.createServer(options, app).listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`${process.env.PORT}번 포트에서 HTTPS 서버 실행 중 (0.0.0.0)`);
  });
} else {
  app.listen(process.env.PORT, "0.0.0.0", () => {
    console.log(`${process.env.PORT}번 포트에서 HTTP 서버 실행 중 (0.0.0.0) - SSL 인증서 없음`);
  });
}