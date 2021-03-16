// https://stackoverflow.com/questions/10656574/how-do-i-manage-mongodb-connections-in-a-node-js-web-application
const { MongoClient } = require("mongodb");
var url =
  "mongodb+srv://web-team:web-team-project@clusterpersonaltecblog.vjh3y.mongodb.net/personalTecBlogDB?retryWrites=true&w=majority";

var option = {
  auto_reconnect: true,
  poolSize: 20,
  connectTimeoutMS: 500,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

function MongoPool() {}

var mongodb;

function initPool(cb) {
  MongoClient.connect(url, option, function (err, db) {
    if (err) throw err;

    mongodb = db;
    if (cb && typeof cb == "function") cb(mongodb);
  });
  return MongoPool;
}

MongoPool.initPool = initPool;

function getInstance(cb) {
  if (!mongodb) {
    initPool(cb);
  } else {
    if (cb && typeof cb == "function") cb(mongodb);
  }
}
MongoPool.getInstance = getInstance;

module.exports = MongoPool;
