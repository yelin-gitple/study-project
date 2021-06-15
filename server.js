const express = require("express");
const path = require("path");
const http = require("http");
const blogRouter = require("./blog");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//server static
app.use(express.static(path.join(__dirname, "dist/blog-study-project")));

//main routing
app.use("/api/blogList", blogRouter);

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist/blog-study-project/index.html"));
// });

//set port
const port = process.env.PORT || "3000";
app.set("port", port);

//create the HTTP server
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Running on location on port ${port}`);
});
