// https://stackoverflow.com/questions/10656574/how-do-i-manage-mongodb-connections-in-a-node-js-web-application
const { MongoClient } = require("mongodb");
var url =
  "mongodb+srv://web-team:web-team-project@clusterpersonaltecblog.vjh3y.mongodb.net/personalTecBlogDB?retryWrites=true&w=majority";

var option = {
  auto_reconnect: true,
  poolSize: 5,
  connectTimeoutMS: 500,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

function MongoPool() {}

var mongodb;

function initPool(cb) {
  MongoClient.connect(url, option, async function (err, db) {
    if (err) throw err;

    console.log("[mongodb] Initialize connection pool.====================");
    mongodb = db;
    console.log("[mongodb]connection ==============" + mongodb);
  });
  return MongoPool;
}

MongoPool.initPool = initPool;

function getInstance(cb) {
  console.log("[mongodb] Get connection instance.=====================");

  if (!mongodb) {
    console.log("[mongodb]instance ==============" + mongodb);
    initPool(cb);
  }

  if (cb && typeof cb == "function") cb(mongodb);
}
MongoPool.getInstance = getInstance;

module.exports = MongoPool;
