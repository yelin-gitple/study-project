const express = require("express");
const path = require("path");
const http = require("http");
const cors = require('cors')
const blogRouter = require("./blogList");

const mongoose = require("mongoose");

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(
    "mongodb://root:mongodb@localhost:27017/gitple?authSource=admin",
    config
  )
  .then(() => console.log("mongo DB connected!"))
  .catch(console.log("mongo DB disconnected"));

const app = express();

//CORS
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//server static
app.use(express.static(path.join(__dirname, "dist/blog-study-project")));

//main routing
app.use("/api/blogList", blogRouter);

//set port
const port = process.env.PORT || "3000";
app.set("port", port);

//create the HTTP server
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Running on location on port ${port}`);
});
