const {
  RESOURCE_CACHE_PROVIDER,
} = require("@angular/platform-browser-dynamic");
const { RSA_NO_PADDING } = require("constants");
const express = require("express");
const router = express.Router();

//Login Page
router.get("/signIn", (req, res) => res.send("signIn"));

//Register Page
router.get("/signUp", (req, res) => res.send("signUp"));

//Register Handle
router.post("/signUp", (req, res) => {
  console.log(req.body);
  res.send("Hello");
});

module.exports = router;
