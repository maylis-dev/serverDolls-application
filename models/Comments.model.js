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
    // goto moongose schema loook for the type                   
    type: mongoose.Schema.Types.ObjectId,//type of date that y ar elooking for so objectid 
    ref: "Product",// refrence le model to which collection the id is coming from
    required: true
  },


});

// Define the model
const Comment = mongoose.model("Comment", commentSchema);

// Export the model
module.exports = Comment;