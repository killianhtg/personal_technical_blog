var MongoPool = require("./DBUtil.js");
var MongoClient = require("mongodb").MongoClient;
var app = require("express")();

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

  dbController.getBlogs = function () {
    var blogs;
    MongoPool.getInstance(async function (client) {
      console.log("==============================");

      var db = client.db(DB_NAME);
      const blogsCol = db.collection("blogs");
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
