# Notion_Tree
20250901~

Visualize the hierarchies of Notion folders by using tree structure.  
Enable users to figure out the whole structure of their Notion folder. 

🔒 Privacy Policy
This project ("Workspace Tree Visualizer") uses the Notion API to access and visualize your workspace data. This policy outlines how your data is collected, used, and protected.

1. Information Collected
This application only accesses data that you explicitly allow via the Notion OAuth 2.0 authorization flow. To provide its core functionality, the application may collect the following information:

User Information: Your Notion user ID, name, and email address, as provided by Notion during the authentication process.

Page Titles and Database Titles: To display page and folder names as nodes in the visual tree.

Page Content: We access page content solely for the purpose of identifying child pages (sub-pages) and blocks to build the hierarchical tree structure. This application does not read, store, or process any other personal or business content (like text, images, or other blocks) within your pages.

Database Structures and Metadata: To identify pages stored within databases and correctly place them within the workspace hierarchy.

2. Data Storage and Usage
All collected data (as listed in Section 1) is processed temporarily in your browser's memory. This data is used exclusively to generate and render the interactive workspace tree visualization.

No data is permanently stored on any server, database, or local file.

Data is not used for any purpose other than displaying your workspace structure back to you.

3. Data Sharing
No personal or workspace data is shared with any third parties. All data processing occurs locally within your browser.

4. Data Retention
We handle your data and tokens with the following retention policies:

Workspace Data: Data such as page titles and page content is processed "in-memory" and is discarded immediately after the visualization is generated. This data is never stored.

Authentication Tokens: Your Notion OAuth access token is stored securely in your browser's local storage to keep you logged in for future sessions. This token is deleted when you manually log out of the application or if you revoke access from your Notion workspace settings.

5. Contact
If you have any questions or requests regarding this policy, please contact: 📧 chickenm00@dgu.ac.kr

Last updated: November 4, 2025

<!-- 사용 기술
- 백엔드  
o Node.js – 서버 런타임 환경  
o Express.js – REST API 구축  
o Axios – Notion API 호출  
- 프론트엔드  
o HTML/CSS/JavaScript – 기본 화면 구성  
o jsTree – 트리 시각화 라이브러리  
o Fetch API – 백엔드에서 제공하는 트리 JSON 데이터 불러오기  
- 외부 API  
o Notion API – Notion 계층 구조 데이터 가져오기  
- 개발자 도구  
o Git & GitHub – 버전 관리  
o Postman – Notion API 테스트  
o VS Code – 개발 IDE   -->