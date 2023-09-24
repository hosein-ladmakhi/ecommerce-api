const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    name: String,
    logo: String,
    bio: String,
    website: String,
    products: { type: [mongoose.Types.ObjectId], ref: "products" },
  },
  { timestamps: true, id: false, _id: true }
);
module.exports = mongoose.model("providers", schema);
