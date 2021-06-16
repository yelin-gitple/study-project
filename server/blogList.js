const { ɵCompiler_compileModuleSync__POST_R3__ } = require("@angular/core");
const express = require("express");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

const BLOG = require("./models/blog");

/* GET /api/blogList */
router.get("/", async (req, res) => {
  try {
    const blogList = await BLOG.find(req.query);
    res.json(blogList);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/* GET /api/blogList/detail/:id */
router.get("/detail/:id", async (req, res) => {
  try {
    const id_obj = ObjectId(req.params.id);
    const blogList = await BLOG.findById(id_obj);

    res.json(blogList);
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
