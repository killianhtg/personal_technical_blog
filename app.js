var express = require("express");
var app = express();
var path = require("path");

var session = require("express-session");
//var FileStore = require("session-file-store")(session);
var cookieParser = require("cookie-parser");

var logger = require("morgan");
var indexRouter = require("./routes/index");

app.use(
  session({
    secret: "tech blog", // to encrypt
    //store: new FileStore(),
    cookie: { maxAge: 10 * 60 * 1000 },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

module.exports = app;
