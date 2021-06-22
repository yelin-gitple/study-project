const restful = require("node-restful");
const mongoose = restful.mongoose;

const { Schema, model } = mongoose;

const BlogSchema = {
  title: String,
  body: String,
  createdAt: Number,
  username: String,
  userId: String,
  uid: String,
};

module.exports = mongoose.model("Blog", BlogSchema);
