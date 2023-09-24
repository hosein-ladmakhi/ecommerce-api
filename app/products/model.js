const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    quantity: Number,
    image: String,
    price: Number,
    category: { type: mongoose.Types.ObjectId, ref: "categories" },
  },
  { timestamps: true, id: false, _id: true }
);
module.exports = mongoose.model("products", schema);
