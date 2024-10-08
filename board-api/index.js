const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // 경로 모듈
const postController = require('./controllers/postController');

const app = express();
app.use(bodyParser.json());

// 정적 파일 제공 설정 (public 폴더)
app.use(express.static(path.join(__dirname, 'public')));

// 기본 경로('/')에서 index.html 제공
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 게시물 관련 라우팅 설정
app.post('/posts', postController.createPost); // 게시물 생성
app.get('/posts', postController.getAllPosts); // 모든 게시물 조회
app.get('/posts/:id', postController.getPostById); // 특정 게시물 조회
app.put('/posts/:id', postController.updatePost); // 게시물 수정
app.delete('/posts/:id', postController.deletePost); // 게시물 삭제

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
