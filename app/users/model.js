const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    email: String,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    mobile: String,
    address: String,
    image: String,
  },
  { timestamps: true, id: false, _id: true }
);
module.exports = mongoose.model("users", schema);
