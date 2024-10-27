const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  category: { type: String, required: true },
  price: { type: Number, required: true, min: [0, "Wrong min price"] },
  discountPercentage: Number,
  rating: {
    type: Number,
    min: [0, "Wrong min rating"],
    max: [5, "Wrong max rating"],
    default: 0,
  },
  stock: { type: Number, min: [0, "Wrong min stock"] },
  thumbnail: String,
});

exports.Product = mongoose.model("Product", productSchema);
