const express = require("express")//import express to create a router for the products routes
const router = express.Router()// create a router for the products routes

const Product = require("../models/Product.model")
const { verifyToken } = require("../middlewares/auth.middlewares")
const User = require("../models/User.model")

router.get("/", (req, res) => {
  console.log("all good");

  const { category } = req.query; 
  const filter = category ? { category } : {}; 


  Product.find(filter)
    .then((products) => res.status(200).json(products))//.then() permet d’exécuter du code après une opération asynchrone (par exemple : appeler une API).
    .catch((err) => {
      console.error("Failed to show products", err);
      res.status(500).json({ message: "Failed to show products", error: err.message });
    });
});

// create new product

router.post("/", verifyToken,(req, res, next) => {



  Product.create({//  crrer le produits et met en relation
     
  name: req.body.name, 
  salePrice: req.body.salePrice,
  category: req.body.category,
  stock: req.body.stock,
  imageUrl: req.body.imageUrl,
  seller: req.payload._id//sleer from token
  // how to call seller should be call in front end
  })
  .then((newProduct) => {
    res.status(201).json(newProduct)
  })
  .catch((error) => {
   
    next(error)
  })

  
})

// get an prudct id
router.get("/:productId", async (req, res) => {

  console.log(req.params)

  try {

    
  const response = await Product
  .findById(req.params.productId)
  
  .populate("seller", "username email"
    
  );
    
    res.json(response)
  } catch (error) {
    console.log(error)
  }

})

// edit product 
router.put("/:productId", verifyToken, async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
        // id from URL
      req.params.productId,   
      req.body,
      // return updated document               
      { new: true }           
      
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);// what happen after exectuing 
  }
});

// delete a product//!private
router.delete("/:productId", verifyToken, async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    next(error);
  }
});

module.exports = router;