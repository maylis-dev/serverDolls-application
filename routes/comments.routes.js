// routes/comments.routes.js
const router = require("express").Router();
const Comment = require("../models/Comments.model");
const { verifyToken } = require("../middlewares/auth.middlewares");

// GET all comments for a product
//!out this route private 
router.get("/", verifyToken, async (req, res, next) => {
  try {
    const { productId } = req.query;// query is for searching and filterign information mostly use in get request  params is 
    const comments = await Comment.find({ product: productId }).populate("username", "username");
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

// CREATE a new comment
// This route is protected, only authenticated users can create comments
router.post("/", verifyToken, async (req, res, next) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      product: req.body.productId,
      username: req.payload._id
    });

    // Populate username before sending
    const populatedComment = await newComment.populate("username", "username");
    res.status(201).json(populatedComment);
  } catch (error) {
    next(error);
  }
});

// DELETE a comment
// Only the author of the comment can delete it
router.delete("/:commentId", verifyToken, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId); // params 

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Only the author can delete
    if (comment.username.toString() !== req.payload._id) {
      // If the user is not the author of the comment, return a 403 Forbidden response
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

module.exports = router;