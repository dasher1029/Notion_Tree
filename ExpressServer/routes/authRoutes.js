const express = require("express");
const axios = require("axios");
const router = express.Router();

// notion 로그인 요청(사용자 리디렉션)
router.get("/login", (req, res) => {
    const authURI = new URL("https://api.notion.com/v1/oauth/authorize");
    authURI.searchParams.set("client_id", process.env.NOTION_CLIENT_ID);
    authURI.searchParams.set("response_type", "code");
    authURI.searchParams.set("owner", "user");
    authURI.searchParams.set("redirect_uri", process.env.REDIRECT_URI);

    res.redirect(authURI.toString());
});

// notion이 되돌려준 코드 받기 
router.get("/callback", async (req, res) => {
    const code = req.query.code;
    if (!code) return res.status(400).send("인증 코드가 없습니다.");

    try{
        // Access Token 요청 
        const response = await axios.post(
            "https://api.notion.com/v1/oauth/token",
            {
                grant_type: "authorization_code",
                code: code,
                redirect_uri: process.env.REDIRECT_URI,
            },
            {
                auth: {
                    username: process.env.NOTION_CLIENT_ID,
                    password: process.env.NOTION_CLIENT_SECRET,
                },
            }
        );

        const { access_token, workspace_id, workspace_name } = response.data;

        // 토큰 확인 
        console.log("Access Token:", access_token);
        console.log("Workspace:", workspace_name);

        res.send(`인증 완료! workspace: ${workspace_name}`);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).send("인증 실패");
    }
});

module.exports = router;