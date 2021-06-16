const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");

const User = require("../models/user");

//passport options
const passportConfig = { usernameField: "userId", passwordField: "password" };

const passportVerify = async (userId, password, done) => {
  try {
    // find user
    const user = await User.findOne({ user_id: userId });

    if (!user) {
      done(null, false, { reason: "There is no match user information" });
      return;
    }

    //if user exists, compare hashed password
    const compareResult = await bcrypt.compare(password, user.password);

    // if hashed password matches, send user data
    if (compareResult) {
      done(null, user);
      return;
    }

    //if hashed password doesn't match
    done(null, false, { reason: "Incorrect password" });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

module.exports = () => {
  passport.use("local", new LocalStrategy(passportConfig, passportVerify));
};
