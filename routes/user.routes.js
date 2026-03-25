const router = require("express").Router();
const User = require("../models/User.model");
const { verifyToken } = require("../middlewares/auth.middlewares");



router.get("/me", verifyToken, async (req, res, next) => {
  try {
    const userId = req.payload._id;

    const user = await User.findById(userId).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});




router.put("/", verifyToken, async (req, res, next) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    //personne qui fais le changment
    const userId = req.payload._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username },
      { new: true }
    );
    console.log(userId)
    console.log(updatedUser)

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);

  } catch (error) {
    next(error);
  }
});

module.exports = router;