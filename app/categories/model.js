const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    title: String,
    image: String,
    products: { type: [mongoose.Types.ObjectId], ref: "products" },
  },
  { timestamps: true, id: false, _id: true }
);
module.exports = mongoose.model("categories", schema);
