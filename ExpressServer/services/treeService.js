const notion = require("./notionService");
const axios = require("axios");

/**
 * 특정 Page ID 아래의 블록 목록(children)을 가져옵니다.
 */
async function getBlockChildren(token, blockId) {
  const res = await axios.get(
    `https://api.notion.com/v1/blocks/${blockId}/children`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": "2022-06-28",
      },
    }
  );
  return res.data.results;
}

/**
 * 재귀적으로 트리를 구성합니다.
 */
exports.buildTree = async function buildTree(token, pageId) {
  // 1) 페이지 정보 가져오기
  const page = await notion.getPage(token, pageId);
  const title = notion.extractTitleFromPage(page) || "제목 없음";

  // 2) 페이지 내부 블록(children) 가져오기
  const blocks = await getBlockChildren(token, pageId);

  // 3) child_page / child_database 블록만 골라내기
  const childPageBlocks = blocks.filter(
    (b) => b.type === "child_page" || b.type === "child_database"
  );

  // 4) 각 자식 페이지에 대해 재귀적으로 트리 생성
  const children = [];
  for (const block of childPageBlocks) {
    const childId = block.id;
    const subtree = await exports.buildTree(token, childId);
    children.push(subtree);
  }

  // 5) 트리 구조 반환
  return {
    id: pageId,
    title,
    children,
  };
};