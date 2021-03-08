var express = require("express");
var router = express.Router();

const dbController = require("../db/DBController.js");

/* GET home page. */
router.get("/index", function (req, res, next) {
  res.send("response");
});

router.get("/getBlogs", async (req, res) => {
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
  console.log("Create file", req.body);

  try {
    const dbRes = await dbController.createBlog(req.body);
    // res.send({ done: dbRes });
    res.redirect("/");
  } catch (e) {
    console.log("Error", e);
    res.status(400).send({ err: e });
  }
});

module.exports = router;
