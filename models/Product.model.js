const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  
  name: { type: String, required: true },
  salePrice: { type: Number, required: true },
  stock: { type: Number, required: true },
    description: { type: String, default: "" },
  imageUrl: String,
  seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String  },
   
  }
);

const Product = model("Product", productSchema);

module.exports = Product;