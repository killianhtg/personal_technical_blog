const titleDiv = document.querySelector("#blog_name");
const contentDiv = document.querySelector("#blog_content");

async function loadPage() {
  titleDiv.innerHTML = "";
  contentDiv.innerHTML = "";

  const currentURLSeg = window.location.pathname.split("/");
  const blogTitle = currentURLSeg.pop();

  console.log("title", blogTitle);

  const titleH2 = document.createElement("h2");
  titleH2.textContent = blogTitle;
  titleDiv.appendChild(titleH2);

  const resRaw = await fetch("/getBlog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: blogTitle }),
  });
  const res = await resRaw.json();

  console.log("Got data");
  console.log(res);

  const content = res[0].content;

  contentDiv.textContent = content;
}

loadPage();
