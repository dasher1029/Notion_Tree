// ExpressServer/controllers/authController.js
const axios = require("axios");

// 🔹 Notion 로그인 URL 생성
exports.login = (req, res) => {
    const authURI = new URL("https://api.notion.com/v1/oauth/authorize");

    authURI.searchParams.set("client_id", process.env.NOTION_CLIENT_ID);
    authURI.searchParams.set("response_type", "code");
    authURI.searchParams.set("owner", "user");
    authURI.searchParams.set("redirect_uri", process.env.REDIRECT_URI);

    return res.redirect(authURI.toString());
};

// 🔹 Notion OAuth callback 처리
exports.callback = async (req, res) => {
    const code = req.query.code;

    if (!code) return res.status(400).send("인증 코드가 없습니다.");

    try {
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

        // 토큰 정보 로그 출력 (확인용)
        console.log("Notion API Response:", response.data);

        const { access_token } = response.data;

        // 🔹 Access Token을 쿠키에 저장
        res.cookie("notion_token", access_token, {
            httpOnly: true,
            secure: false, 
            maxAge: 1000 * 60 * 60 * 24, // 24시간
        });

        // 인증 후 home.html로 이동
        return res.redirect("/home.html");

    } catch (error) {
        console.error(error.response?.data || error.message);
        return res.status(500).send("인증 실패");
    }
};