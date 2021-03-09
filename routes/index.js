var express = require("express");
var router = express.Router();

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
      const dbRes = await dbController.createBlog(req.body);
      // res.send({ done: dbRes });
      res.redirect("/");
    } catch (e) {
      console.log("Error", e);
      res.status(400).send({ err: e });
    }
  } else {
    console.log("------------> need login to create");
  }
});

// user
var users = require("./users").items;

var findUser = function (username, password) {
  return users.find(function (item) {
    return item.username === username && item.password === password;
  });
};

// user control
router.post("/login", function (req, res) {
  let name = req.body.username;
  let exist = findUser(name, req.body.password);

  if (exist) {
    req.session.loginUser = name;
    console.log("=========login: " + name + "==============");
    res.json({ code: 0, msg: "Success" });
  } else {
    res.json({ code: 1, msg: "Incorrect username or password." });
  }
});

router.get("/logout", function (req, res) {
  console.log("logout: " + req.session);
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
