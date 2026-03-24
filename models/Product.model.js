const mongoose = require("mongoose");
//import mongoose to create a schema and model for the product
const { Schema, model } = mongoose;
//creer un schema modem pour les produits

const productSchema = new Schema({
  
  name: { type: String, required: true },// name of the product // required true because i want to make sure that the user enter the name of the product
  salePrice: { type: Number, required: true },//error if the saleprice is not a number or if it is missing
  stock: { type: Number, required: true },
    description: { type: String, default: "" },
  imageUrl: String,
  seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String  },
   
  }
);

const Product = model("Product", productSchema);


module.exports = Product;