let posts = [];

// 게시물 생성
exports.createPost = (req, res) => {
  const { title, content } = req.body;
  const id = posts.length + 1;
  const newPost = { id, title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
};

// 모든 게시물 조회
exports.getAllPosts = (req, res) => {
  res.json(posts);
};

// 특정 게시물 조회
exports.getPostById = (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};

// 게시물 수정
exports.updatePost = (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: 'Post not found' });

  const { title, content } = req.body;
  post.title = title;
  post.content = content;
  res.json(post);
};

// 게시물 삭제
exports.deletePost = (req, res) => {
  const postIndex = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (postIndex === -1)
    return res.status(404).json({ message: 'Post not found' });

  posts.splice(postIndex, 1);
  res.status(204).send();
};
