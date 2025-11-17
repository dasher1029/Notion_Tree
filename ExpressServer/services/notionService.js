const http = require("../utils/httpClient");

exports.searchPages = async (token) => {
  return await http.post(
    "https://api.notion.com/v1/search",
    { filter: { property: "object", value: "page" } },
    token
  );
};

exports.getPage = async (token, pageId) => {
  return await http.get(`https://api.notion.com/v1/pages/${pageId}`, token);
};

exports.extractTitleFromPage = (page) => {
  return page.properties?.title?.title?.[0]?.plain_text || "(제목 없음)";
};