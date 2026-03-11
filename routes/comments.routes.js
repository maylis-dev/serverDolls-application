// routes/comments.routes.js
const router = require("express").Router();
const Comment = require("../models/Comments.model");
const { verifyToken } = require("../middlewares/auth.middlewares");

// GET all comments for a product
router.get("/", async (req, res, next) => {
  try {
    const { productId } = req.query;
    const comments = await Comment.find({ product: productId }).populate("username", "username");
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

// CREATE a new comment
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
router.delete("/:commentId", verifyToken, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Only the author can delete
    if (comment.username.toString() !== req.payload._id) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;