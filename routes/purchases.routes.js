const express = require("express")
const router = express.Router()

const Purchase = require("../models/Purchase.model")
const { verifyToken } = require("../middlewares/auth.middlewares")

router.get("/" , (req, res) => {
    console.log("all good ")
    Purchase.find()
    .then((purchases) => res.status(200).json(purchases))//.then() permet d’exécuter du code après une opération asynchrone (par exemple : appeler une API).
    .catch((err) => console.error("Failed to show products", err));
})

// create purchase private 
router.post("/", verifyToken, async (req, res, next) => {
  try {
    const { sellerId, dollId, price } = req.body;   // extract seller informayion      
    const { _id: userId } = req.payload;   //mon email ect...
    
    //affiche payload et body
    console.log(req.payload)
    console.log(req.body)

    // Create the purchase
   Purchase.create({
      sellerId,
      userId,
      dollId,
      price,
      date: Date.now()
    });

    res.status(201).json(Purchase);

  } catch (error) {
    next(error);
  }
});


// Update a review
router.patch("/:purchaseId", async (req, res, next) => {
  try {
    const updatedPurchase = await Purchase.findByIdAndUpdate(
      // ID from URL
      req.params.purchaseId,
      // fields to update (only review)
      { review: req.body.review },
      // return updated document 
      { new: true }
    );


    res.status(200).json(updatedPurchase);
  } catch (error) {
    next(error);
  }
});


module.exports = router; 