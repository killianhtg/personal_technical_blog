const divBlogs = document.querySelector("#blog-lists");

function check() {
  console.log(
    "check: " + $("#username")[0].value + "  " + $("#password")[0].value
  );
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/users/login",
    data: {
      username: $("#username")[0].value,
      password: $("#password")[0].value,
    },
    success: function (data) {
      if (data.code == 0) {
        $("#login").css("display", "none");
        $("#createBlog").css("display", "block");
        $("#logout").css("display", "inline");
      } else {
        alert("Incorrect username or password.");
      }
    },
  });
}

function renderBlog(blog) {
  if (!blog.name || !blog.content) {
    return;
  }

  const divBlog = document.createElement("div");

  const blogName = document.createElement("h3");
  blogName.textContent = blog.name;
  divBlog.appendChild(blogName);

  const blogContent = document.createElement("p");
  blogContent.textContent = blog.content;
  divBlog.appendChild(blogContent);

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
