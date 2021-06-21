const express = require("express");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

const BLOG = require("../models/blog");

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
router.post("/newPost", async (req, res) => {
  try {
    const blogItem = await BLOG.create(req.body);
    res.json(blogItem);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/* PUT */
router.put("/detail/:id", async (req, res) => {
  try {
    const id_obj = ObjectId(req.params.id);
    await BLOG.updateOne({ _id: id_obj }, req.body);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/* DELETE */
router.delete("/detail/:id", (req, res) => {
  try {
    const id_obj = ObjectId(req.params.id);
    BLOG.deleteOne({ _id: id_obj }).then((result) => {
      res.status(200).json({
        message: "Delete success",
      });
    });
  } catch (error) {
    res.status(204).end();
  }
});

module.exports = router;
