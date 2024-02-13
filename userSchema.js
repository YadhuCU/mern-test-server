const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  address: { type: String },
  mobile: { type: String },
  password: { type: String },
  dateOfBirth: { type: String },
  course: { type: String },
  gender: { type: String },
});

const users = mongoose.model("users", userSchema);

module.exports = users;
