const express = require("express");

const BLOG = require("../models/blog");
const router = express.Router();

/* GET contents keywords */
router.get("/", async (req, res) => {
  try {
    const keywords = await getKeywords();
    res.json({ keywordsList: keywords });
  } catch (error) {
    res.status(500).json({ error });
  }
});

const getKeywords = async () => {
  const blogList = await BLOG.find();
  let text_to_summarize = blogList.map((obj) => obj.body).join();
  let number_of_sentences = 5;

  let SummarizerManager = require("node-summarizer").SummarizerManager;

  let Summarizer = new SummarizerManager(
    text_to_summarize,
    number_of_sentences
  );

  let summary = await Summarizer.getSummaryByRank().then((summary_object) => {
    return summary_object;
  });

  const testArr = summary.nouns_and_adjactive_map.values();
  const frequency = new Map();

  for (const f of testArr) {
    for (const text of f) {
      const count = frequency.get(text);
      if (count === undefined) frequency.set(text, 1);
      else frequency.set(text, count + 1);
    }
  }
  const topFiveKeywords = [...frequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return topFiveKeywords;
};

module.exports = router;
