const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const USER = require("../models/user");
const jwt = require("jsonwebtoken");
const key = require("../passport/key");
const passport = require("passport");

//Get current user
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      userId: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    });
  }
);

//Register Handle
router.post("/signUp", async (req, res) => {
  await USER.findOne({ userId: req.body.userId }).then((user) => {
    if (user) {
      return res.status(400).json({
        message: "User ID is already exists",
      });
    } else {
      const newUser = new USER({
        userId: req.body.userId,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// Login Handle
router.post("/signIn", (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;

  // find user by userId
  USER.findOne({ userId }).then((user) => {
    if (!user) {
      //errors.userId = "해당하는 회원이 존재하지 않습니다.";
      return res.status(400).json({
        message: "Incorrect ID",
      });
    }

    // check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // user password matches
        // generate JWT PAYLOAD
        const payload = {
          uid: user._id,
          userId: user.userId,
          name: `${user.firstName} ${user.lastName}`,
        };

        // create JWT
        // is valid for an hour
        jwt.sign(
          payload,
          key.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              uid: user._id,
              userId: user.userId,
              username: payload.name,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        //errors.password = "패스워드가 일치하지 않습니다.";
        return res.status(400).json({
          message: "Password doesn't match",
        });
      }
    });
  });
});

module.exports = router;
