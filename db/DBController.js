const { MongoClient } = require("mongodb");
var MongoPool = require("./DBUtil.js");

function DBController() {
  const dbController = {};
  var url =
    "mongodb+srv://web-team:web-team-project@clusterpersonaltecblog.vjh3y.mongodb.net/personalTecBlogDB?retryWrites=true&w=majority";
  const DB_NAME = "personalTecBlogDB";

  dbController.createBlog = async (blog) => {
    MongoPool.getInstance(function (client) {
      const blogCol = client.db.collection("blogs");
      //console.log("Blogs Collection ready, insert ", blog);
      const res = blogCol.insertOne(blog);
      console.log("Inserted", res);
      return res;
    });
  };

  dbController.getBlogs = async (query = {}) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const blogsCol = db.collection("blogs");
      console.log("Blogs Collection ready, querying with ", query);
      const blogs = await blogsCol.find(query).toArray();
      console.log("Got blogs");
      //console.log(blogs);

      return blogs;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  dbController.createBlog = async (blog) => {
    MongoPool.getInstance(function (client) {
      const blogCol = client.db.collection("blogs");
      //console.log("Blogs Collection ready, insert ", blog);
      const res = blogCol.insertOne(blog);
      console.log("Inserted", res);
      return res;
    });
  };
  dbController.getUser = async function a(name) {
    var pwd;
    MongoPool.getInstance(function (client) {
      const users = client.db.collection("users");
      pwd = users.find({ username: name }).toArray();
    });
    return pwd;
  };

  return dbController;
}

module.exports = DBController();
