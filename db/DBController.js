var MongoPool = require("./DBUtil.js");
var MongoClient = require("mongodb").MongoClient;
var app = require("express")();
const url =
  "mongodb+srv://web-team:web-team-project@clusterpersonaltecblog.vjh3y.mongodb.net/personalTecBlogDB?retryWrites=true&w=majority";

const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect();

function DBController() {
  const dbController = {};
  const DB_NAME = "personalTecBlogDB";

  dbController.createBlog = async (blog) => {
    MongoPool.getInstance(function (client) {
      const blogsCol = client.db(DB_NAME).collection("blogs");
      const res = blogsCol.insertOne(blog);
      console.log("Inserted", res);
      return res;
    });
  };

  dbController.getBlogs = async function () {
    var blogs;
    await MongoPool.getInstance(async function (client) {
      console.log("==============================");

      var db1 = client.db(DB_NAME);
      const blogsCol = db1.collection("blogs");
      console.log("Blogs Collection ready=============", blogsCol);

      blogs = await blogsCol.find({}).toArray();
    });
    return blogs;
  };

  dbController.getUser = async function (name) {
    var pwd;
    await MongoPool.getInstance(function (client) {
      const users = client.db(DB_NAME).collection("users");
      pwd = users.find({ username: name }).toArray();
    });
    return pwd;
  };

  return dbController;
}

module.exports = DBController();
