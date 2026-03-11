// models/Comment.model.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    username: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
    content: { type: String, required: true },
  product: {                       
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },


});

// Define the model
const Comment = mongoose.model("Comment", commentSchema);

// Export the model
module.exports = Comment;