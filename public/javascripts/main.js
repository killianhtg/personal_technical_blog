const divBlogs = document.querySelector("#blog-lists");
const divErr = document.querySelector("#error");
const username = document.getElementById("username").value;
const password = document.getElementById("password").value;
const login = document.querySelector("#login");
const createBlog = document.querySelector("#createBlog");
const logout = document.querySelector("#logoutBtn");

async function loginCheck() {
  event.preventDefault();
  console.log("check: " + username + "  " + password);

  const formData = new FormData(login);

  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const resRaw = await fetch("/login", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await resRaw.json();

  if (res.code == 0) {
    reloadPage();
    afterLogin();
  } else {
    divErr.style.display = "block";
    divErr.innerHTML = "Incorrect username or password.";
  }
}

function afterLogin() {
  login.style.display = "none";
  createBlog.style.display = "block";
  logout.style.display = "block";
}

async function deleteBlog(blog) {
  console.log("=========blog to delete:", JSON.stringify(blog));
  await fetch("/deleteBlog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog), // body data type must match "Content-Type" header
  });

  console.log("delete", blog);

  reloadPage();
}

function renderBlog(blog) {
  if (!blog.name || !blog.content) {
    return;
  }

  console.log("blog:", blog);

  const divBlog = document.createElement("div");
  const titleSpan = document.createElement("span");

  const blogName = document.createElement("h3");
  const blogNameAnchor = document.createElement("a");
  blogNameAnchor.href = `/blog/${blog.name}`;
  blogNameAnchor.innerText = blog.name;
  blogName.appendChild(blogNameAnchor);
  titleSpan.appendChild(blogName);

  if (loginState === 1) {
    afterLogin();

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "X";
    btnDelete.className = "btn btn-danger";
    btnDelete.addEventListener("click", () => deleteBlog(blog));
    blogName.appendChild(btnDelete);
  }

  divBlog.appendChild(titleSpan);

  const blogContent = document.createElement("p");
  blogContent.textContent = blog.content.substring(0, 100);
  divBlog.appendChild(blogContent);

  divBlogs.appendChild(divBlog);
}

var loginState = 0;
async function reloadPage() {
  divBlogs.innerHTML = "";
  const resRaw = await fetch("/getBlogs");
  const res = await resRaw.json();
  const resBlogs = res.blogs;
  loginState = res.loginStatus;

  console.log("Got data");
  console.log(res);

  if (resBlogs) {
    resBlogs.forEach(renderBlog);
  }
}
window.onload = reloadPage();

login.addEventListener("submit", loginCheck);
