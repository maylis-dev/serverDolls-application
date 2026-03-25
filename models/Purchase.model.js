const mongoose = require("mongoose");
//import mongoose to create a schema and model for the purchase
const { Schema, model } = mongoose;
//creer un schema modem pour les achats

const purchaseSchema = new Schema({
   sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  //ref to the product that i want to buy
  dollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  price: {
    type: Number,
  },

  date: {
    type: Date,
    default: Date.now
  },

  review: {
      type: String 

  }
});

//property rveiw  condition to after 
const Purchase = model("Purchase", purchaseSchema);
//? should i delte this route 
 
module.exports = Purchase; //export the model to use it in the routes and controllers