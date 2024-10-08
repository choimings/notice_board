// 게시글을 서버로 전송하는 함수 (POST 요청)
async function createPost(title, content) {
  const response = await fetch('http://localhost:8000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });
  return response.json();
}

// 서버에서 게시글 목록을 가져오는 함수 (GET 요청)
async function fetchPosts() {
  const response = await fetch('http://localhost:8000/posts');
  return response.json();
}

// 페이지 로드 시 게시글 목록을 불러와서 화면에 표시
document.addEventListener('DOMContentLoaded', async () => {
  const posts = await fetchPosts();
  const postList = document.getElementById('postList');

  posts.forEach((post) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const postTitle = document.createElement('h3');
    postTitle.classList.add('post-title');
    postTitle.innerText = post.title;

    const postContent = document.createElement('p');
    postContent.classList.add('post-content');
    postContent.innerText = post.content;

    postElement.appendChild(postTitle);
    postElement.appendChild(postContent);

    postList.appendChild(postElement);
  });
});

// 새 게시물을 작성할 때 서버에 전송하고 화면에 추가하는 로직
document
  .getElementById('submitPost')
  .addEventListener('click', async function () {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    if (title === '' || content === '') {
      alert('제목과 내용을 모두 입력하세요.');
      return;
    }

    // 서버에 게시글 전송
    const newPost = await createPost(title, content);

    // 새로운 게시물을 화면에 추가
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const postTitle = document.createElement('h3');
    postTitle.classList.add('post-title');
    postTitle.innerText = newPost.title;

    const postContent = document.createElement('p');
    postContent.classList.add('post-content');
    postContent.innerText = newPost.content;

    postElement.appendChild(postTitle);
    postElement.appendChild(postContent);

    document.getElementById('postList').appendChild(postElement);

    // 입력 필드 초기화
    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
  });
