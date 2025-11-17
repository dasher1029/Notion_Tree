// ExpressServer/controllers/notionController.js
// Notion 관련 비즈니스 로직 (트리 데이터, 현재 디렉토리 등)

const notionService = require("../services/notionService");
const treeService = require("../services/treeService");

// 공통: 쿠키에서 Access Token 꺼내기
function getAccessTokenFromCookies(req) {
    const token = req.cookies?.notion_token;
    if (!token) {
        const err = new Error("Notion access token is missing. Please login again.");
        err.status = 401;
        throw err;
    }
    return token;
}

// POST /api/select-directory
// body: { "pageId": "xxxx" }
exports.selectDirectory = (req, res, next) => {
    try {
        const { pageId } = req.body;

        if (!pageId) {
            return res.status(400).json({ message: "pageId is required." });
        }

        // selected_page_id 쿠키에 저장 (클라이언트에서 읽을 수 있게 httpOnly: false)
        res.cookie("selected_page_id", pageId, {
            httpOnly: false,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24, // 24h
        });

        return res.status(204).end(); // 내용 없이 성공
    } catch (err) {
        next(err);
    }
};

// GET /api/current-directory
// 선택된 디렉토리 정보를 반환
exports.getCurrentDirectory = async (req, res, next) => {
    try {
        const accessToken = getAccessTokenFromCookies(req);
        const pageId = req.cookies?.selected_page_id;

        if (!pageId) {
            return res.status(404).json({
                message: "No selected directory. Please choose a page first.",
            });
        }

        const page = await notionService.getPage(accessToken, pageId);
        const title = notionService.extractTitleFromPage(page);

        return res.json({
            id: page.id,
            title,
        });
    } catch (err) {
        next(err);
    }
};

// GET /api/pages
exports.getPages = async (req, res, next) => {
    try {
        const token = req.cookies?.notion_token;

        if (!token) {
            return res.status(401).json({ message: "Notion token missing. Please login again." });
        }

        const result = await notionService.searchPages(token);

        return res.json(result);
    } catch (err) {
        next(err);
    }
};

// GET /api/tree-data
// 선택된 디렉토리를 루트로 하는 트리 데이터 반환
// 쿼리로 pageId가 들어오면 그것을 우선 사용, 없으면 selected_page_id 쿠키 사용
exports.getTreeData = async (req, res, next) => {
    try {
        const accessToken = getAccessTokenFromCookies(req);
        const pageIdFromQuery = req.query.pageId;
        const pageIdFromCookie = req.cookies?.selected_page_id;

        const rootPageId = pageIdFromQuery || pageIdFromCookie;

        if (!rootPageId) {
            return res.status(400).json({
                message: "Root page id is not provided. Use ?pageId=... or select a directory first.",
            });
        }

        const tree = await treeService.buildTree(accessToken, rootPageId);

        return res.json(tree);
    } catch (err) {
        next(err);
    }
};