const { MongoClient } = require("mongodb");
var url =
  "mongodb+srv://web-team:web-team-project@clusterpersonaltecblog.vjh3y.mongodb.net/personalTecBlogDB?retryWrites=true&w=majority";

var option = {
  reconnectTries: 3,
  auto_reconnect: true,
  poolSize: 40,
  connectTimeoutMS: 500,
  useNewUrlParser: true,
};

function MongoPool() {}

var p_db;

function initPool(cb) {
  MongoClient.connect(url, option, function (err, db) {
    if (err) throw err;

    p_db = db;
    if (cb && typeof cb == "function") cb(p_db);
  });
  return MongoPool;
}

MongoPool.initPool = initPool;

function getInstance(cb) {
  if (!p_db) {
    initPool(cb);
  } else {
    if (cb && typeof cb == "function") cb(p_db);
  }
}
MongoPool.getInstance = getInstance;

module.exports = MongoPool;
