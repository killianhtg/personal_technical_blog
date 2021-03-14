const express = require("express");
const router = express.Router();

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

module.exports = router;
