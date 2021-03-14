const { MongoClient } = require("mongodb");

function DBController() {
  const dbController = {};
  // TODO: implement connection and function to database
  const url =
    "mongodb+srv://web-team:web-team-project@clusterpersonaltecblog.vjh3y.mongodb.net/personalTecBlogDB?retryWrites=true&w=majority";
  const DB_NAME = "personalTecBlogDB";

  dbController.createBlog = async (blog) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const blogCol = db.collection("blogs");
      console.log("Blogs Collection ready, insert ", blog);
      const res = await blogCol.insertOne(blog);
      console.log("Inserted", res);

      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
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

  dbController.getUsers = async (query = {}) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const usersCol = db.collection("users");
      console.log("Users Collection ready, querying with ", query);
      const users = await usersCol.find(query).toArray();
      console.log("Got users");
      //console.log(blogs);

      return users;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  return dbController;
}

module.exports = DBController();
