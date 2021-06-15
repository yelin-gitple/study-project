const express = require("express");
const router = express.Router();

// const BLOG = [
//   {
//     id: 1,
//     title: "The Official Buzz from Blogger at Google",
//     body: "The Blogger API enables you to integrate Blogger content with your application by using the REST APIs. Before you begin, you will need to set up authorization.",
//     createdAt: Date.now(),
//     username: "Nancy",
//   },
//   {
//     id: 2,
//     title:
//       "Add a running list of blog posts, pages and comments to a non-Blogger hosted site.",
//     body: "The Blogger API enables you to integrate Blogger content with your application by using the REST APIs. Before you begin, you will need to set up authorization.",
//     createdAt: Date.now(),
//     username: "Michael",
//   },
//   {
//     id: 3,
//     title:
//       "Create a desktop application or plugin that allows users to create and edit posts from the desktop",
//     body: "The Blogger API enables you to integrate Blogger content with your application by using the REST APIs. Before you begin, you will need to set up authorization.",
//     createdAt: Date.now(),
//     username: "Jenny",
//   },
// ];

const BLOG = require("./models/blog");

/* GET /api/blogList */
router.get("/", async (req, res) => {
  try {
    console.log("get");
    const blogList = await BLOG.find(req.query);
    res.json(blogList);
    //res.json(BLOG);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/* POST /api/blogList */
router.post("/", async (req, res) => {
  try {
    const blogItem = await BLOG.create(req.body);
    res.json(blogItem);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
