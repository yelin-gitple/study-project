const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const UserSchema = Schema({
  //_id: mongoose.Types.ObjectId,
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
  // date: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = model("User", UserSchema);
