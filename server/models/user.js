const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const UserSchema = Schema({
  userId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

});

module.exports = model("User", UserSchema);
