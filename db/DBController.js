const { MongoClient, ObjectId } = require("mongodb");

function DBController() {
  const dbController = {};
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
      console.log("Collection ready, insert ", blog);
      const res = await blogCol.insertOne(blog);
      console.log("Inserted", res);

      return res;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  dbController.getBlogs = async (query = {}) => {    // you can combine all getter functions to one function.
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

  dbController.getBlog = async (name) => {     // you can combine all getter functions to one function.
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const blogsCol = db.collection("blogs");
      console.log("Blogs Collection ready, querying with name", name);
      const blog = await blogsCol.find({ name: name.name }).toArray();
      console.log("Got blog");
      //console.log(blogs);

      return blog;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  dbController.deleteBlog = async function (blog) {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const filesCol = db.collection("blogs");
      console.log("Collection ready, deleting ", blog);
      const files = await filesCol.deleteOne({ _id: ObjectId(blog._id) });
      console.log("Got files", files);

      return files;
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  dbController.getUser = async function (name) {   // you can combine all getter functions to one function.
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log("Connecting to the db");
      await client.connect();
      console.log("Connected!");
      const db = client.db(DB_NAME);
      const usersCol = db.collection("admin");
      console.log("Collection ready, get users ", name);
      const res = await usersCol.find({ username: name }).toArray();
      //console.log("======================================name");
      return res;
    } catch (err) {
      console.log("dbcontroller error", err);
    } finally {
      console.log("Closing the connection");
      client.close();
    }
  };

  return dbController;
}    

module.exports = DBController();
