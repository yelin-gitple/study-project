const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const restful = require("node-restful");
const mongoose = restful.mongoose;
const passport = require("passport");
const { Schema } = mongoose;


const userRouter = require("./routes/users");
const keywordsRouter = require("./routes/keywords");

const app = express();

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

//CORS
app.use(cors());

//Bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

//server static
app.use(express.static(path.join(__dirname, "dist/blog-study-project")));

//main routing
app.use("/api/users", userRouter);
app.use("/api/keywords", keywordsRouter);

// set passport module
require("./passport/passport")(passport);

//set port
const port = process.env.PORT || "3000";
app.set("port", port);

//create the HTTP server
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Running on location on port ${port}`);
});


/*/// blogList ///*/
const BlogSchema = new Schema({
  title: String,
  body: String,
  createdAt: Number,
  username: String,
  userId: String,
  uid: String,
});

const Resource = restful
  .model("blog", BlogSchema)
  .methods(["get", "post", "put", "delete"]);

Resource.register(app, "/api/blogList");
