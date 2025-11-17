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

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT}번 포트에서 서버 실행 중`);
});