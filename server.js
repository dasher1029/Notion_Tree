const express = require('express');
const app = express();
const PORT = 3000;

//JSON 요청 파싱 
app.use(express.json());

//GET 요청
app.get('/hello', (req, res) => {
    res.json({message: 'Hello from Node.js!'});
});

//POST 요청
app.post('/echo', (req, res) => {
    res.json({
        received: req.body,
        note: 'This is what you sent to me!'
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http:localhost:${PORT}`);
});