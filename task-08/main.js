let postsList = document.getElementById("posts");
let errorDiv = document.getElementById("error");
let modal = document.getElementById("modal");
let modalTitle = document.getElementById("modalTitle");
let modalBody = document.getElementById("modalBody");
let closeBtn = document.getElementById("closeBtn");

async function fetchPosts() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    console.log(response);
    if (!response.ok) {
      console.error(response.status);
    }
    let posts = await response.json();
    showPosts(posts);
  } catch (error) {
    let errorText = document.createElement("p");
    errorText.className = "error-text";
    errorDiv.appendChild(errorText);
    errorText.innerHTML = `Failed to load posts: ${error.message}`;
  }
}

function showPosts(posts) {
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];

    let postItem = document.createElement("li");
    postItem.innerHTML = post.title;
    postItem.addEventListener("click", () => showModal(post));
    postsList.appendChild(postItem);
  }
}

function showModal(post) {
  modalTitle.textContent = post.title;
  modalBody.textContent = post.body;
  modal.style.display = "block";
}

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

fetchPosts();
