const axios = require("axios");

exports.login = (req, res) => {
  const url = new URL("https://api.notion.com/v1/oauth/authorize");
  url.searchParams.set("client_id", process.env.NOTION_CLIENT_ID);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("owner", "user");
  url.searchParams.set("redirect_uri", process.env.REDIRECT_URI);

  res.redirect(url.toString());
};

exports.callback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("인증 코드가 없습니다.");

  try {
    const tokenRes = await axios.post(
      "https://api.notion.com/v1/oauth/token",
      {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.REDIRECT_URI
      },
      {
        auth: {
          username: process.env.NOTION_CLIENT_ID,
          password: process.env.NOTION_CLIENT_SECRET
        }
      }
    );

    const { access_token } = tokenRes.data;

    res.cookie("notion_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    });

    res.redirect("/home.html");
  } catch (err) {
    console.error(err);
    res.status(500).send("토큰 발급 실패");
  }
};