const express = require("express");
const router = express.Router();

/* GET users listing. */
// user

// TODO: change the logic to get users data from mongo db
const users = require("./users").items;

const findUser = function (username, password) {
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
