const divBlogs = document.querySelector("#blog-lists");

function check() {
  console.log("click login");
  // console.log(
  //   "check: " + $("#username")[0].value + "  " + $("#password")[0].value
  // );
  // $.ajax({
  //   type: "POST",
  //   url: "http://localhost:3000/users/login",
  //   data: {
  //     username: $("#username")[0].value,
  //     password: $("#password")[0].value,
  //   },
  //   success: function (data) {
  //     if (data.code == 0) {
  //       $("#login").css("display", "none");
  //       $("#createBlog").css("display", "block");
  //       $("#logout").css("display", "inline");
  //     } else {
  //       alert("Incorrect username or password.");
  //     }
  //   },
  // });
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

  const blogName = document.createElement("h3");
  const blogNameAnchor = document.createElement("a");
  blogNameAnchor.href = `/blog/${blog.name}`;
  blogNameAnchor.innerText = blog.name;
  blogName.appendChild(blogNameAnchor);
  divBlog.appendChild(blogName);

  const blogContent = document.createElement("p");
  blogContent.textContent = blog.content;
  divBlog.appendChild(blogContent);

  // TODO: only add delete button when session is valid
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "X";
  btnDelete.className = "btn btn-danger";
  btnDelete.addEventListener("click", () => deleteBlog(blog));
  divBlog.appendChild(btnDelete);

  divBlogs.appendChild(divBlog);
}

async function reloadPage() {
  divBlogs.innerHTML = "";
  const resRaw = await fetch("/getBlogs");
  const res = await resRaw.json();

  console.log("Got data");
  console.log(res);

  if (res.blogs) {
    res.blogs.forEach(renderBlog);
  }
}

reloadPage();
