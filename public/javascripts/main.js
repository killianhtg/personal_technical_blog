const divBlogs = document.querySelector("#blog-lists");

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
  // console.log(res);

  if (res.blogs) {
    res.blogs.forEach(renderBlog);
  }
}

reloadPage();
