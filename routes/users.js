const express = require("express");
const router = express.Router();
const dbController = require("../db/DBController.js");

/* GET users listing. */
// TODO: change the logic to get users data from mongo db
const findUser = async function (username, password) {
  const pwd = await dbController.getUser(username);
  return password === pwd;
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
