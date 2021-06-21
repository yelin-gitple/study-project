const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");

const blogRouter = require("./routes/blogList");
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
app.use("/api/blogList", blogRouter);
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
