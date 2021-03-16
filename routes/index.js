const express = require("express");
const router = express.Router();
const path = require("path");

const dbController = require("../db/DBController.js");

/* GET home page. */
router.get("/index", function (req, res) {
  res.send("response");
});

// blogs
router.get("/getBlogs", async (req, res) => {
  console.log("=========getBlog: " + req.session.loginUser + "==============");

  try {
    console.log("myDB", dbController);
    const blogs = await dbController.getBlogs();
    res.send({ blogs: blogs });
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

router.post("/createBlog", async (req, res) => {
  console.log(
    "=========createBlog: " + req.session.loginUser + "=============="
  );

  if (req.session.loginUser !== undefined) {
    console.log("-----------> Create file", req.body);
    try {
      await dbController.createBlog(req.body);
      res.redirect("/");
    } catch (e) {
      console.log("Error", e);
      res.status(400).send({ err: e });
    }
  } else {
    console.log("------------> need login to create");
  }
});

router.post("/deleteBlog", async (req, res) => {
  console.log(
    "=========deleteBlog: " + req.session.loginUser + "=============="
  );

  try {
    console.log("myDB", dbController);
    console.log("deleteBlog Req boduy", req.body);
    await dbController.deleteBlog(req.body);
    res.redirect("/");
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

router.get("/blog/:param", (req, res) => {
  res.sendFile(path.join(__dirname, "/../public/blogDetail.html"));
});

router.post("/getBlog", async (req, res) => {
  try {
    console.log("myDB", dbController);
    console.log("req body", req.body);
    const blog = await dbController.getBlog(req.body);
    res.send(blog);
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

module.exports = router;
