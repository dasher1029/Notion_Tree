const express = require("express");
const router = express.Router();
const notionController = require("../controllers/notionController");

router.get("/api/pages", notionController.getPages);
router.post("/api/select-directory", notionController.selectDirectory);
router.get("/api/current-directory", notionController.getCurrentDirectory);
router.get("/api/tree-data", notionController.getTreeData);

module.exports = router;