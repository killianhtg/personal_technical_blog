var MongoPool = require("./DBUtil.js");

function DBController() {
  const dbController = {};
  const DB_NAME = "personalTecBlogDB";

  dbController.createBlog = async (blog) => {
    await MongoPool.getInstance(function (client) {
      const blogsCol = client.db(DB_NAME).collection("blogs");
      const res = blogsCol.insertOne(blog);
      console.log("Inserted", res);
      return res;
    });
  };

  dbController.getBlogs = async function () {
    var blogs;
    await MongoPool.getInstance(function (client) {
      //console.log("==============================");

      const blogsCol = client.db(DB_NAME).collection("blogs");
      console.log("Blogs Collection ready, insert ", blogsCol);

      blogs = blogsCol.find({}).toArray();
      console.log("Got blogs");
    });
    return blogs;
  };

  // dbController.getBlogs = async (query = {}) => {
  //   let client;
  //   try {
  //     client = new MongoClient(url, { useUnifiedTopology: true });
  //     console.log("Connecting to the db");
  //     await client.connect();
  //     console.log("Connected!");
  //     const db = client.db(DB_NAME);
  //     const blogsCol = db.collection("blogs");
  //     console.log("Blogs Collection ready, querying with ", query);
  //     const blogs = await blogsCol.find(query).toArray();
  //     console.log("Got blogs");
  //     //console.log(blogs);

  //     return blogs;
  //   } finally {
  //     console.log("Closing the connection");
  //     client.close();
  //   }
  // };

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
