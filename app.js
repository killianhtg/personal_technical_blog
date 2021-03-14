const express = require("express");
const app = express();
const path = require("path");

const session = require("express-session");
const FileStore = require("session-file-store")(session);
const cookieParser = require("cookie-parser");

const logger = require("morgan");
const indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

require("./db/DBUtil").initPool();

app.use(
  session({
    secret: "tech blog", // to encrypt
    store: new FileStore(),
    cookie: { maxAge: 10 * 60 * 1000 },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); // locate the static resources

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
