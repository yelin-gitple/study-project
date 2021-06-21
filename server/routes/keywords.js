const express = require("express");
const BLOG = require("../models/blog");
const router = express.Router();

/* GET contents keywords */
router.get("/", async (req, res) => {
  try {

    getKeywords()
    // console.log("dd");
    // console.log(test)
    // const blogList = await BLOG.find(req.query);
    // res.json(blogList);
  } catch (error) {
    res.status(500).json({ error });
  }
});

const getKeywords = async() => {
  const blogList = await BLOG.find();

  for(const blogItem of blogList){
    console.log(blogItem)
  }
  let SummarizerManager = require("node-summarizer").SummarizerManager;
  let text_to_summarize = "node-summarizer node-summarizer";
  let number_of_sentences = 1;

  let Summarizer = new SummarizerManager(
    text_to_summarize,
    number_of_sentences
  );
};

module.exports = router;
