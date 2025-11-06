const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./ExpressServer/routes/authRoutes.js");

dotenv.config();
const app = express();
app.use(express.static("Client"));

//라우터 등록 
app.use("/", authRouter)

app.listen(process.env.PORT, () => {
    console.log(`${process.env.PORT}번 포트에서 서버 실행 중`);
});



