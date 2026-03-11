const router = require("express").Router();
const Product = require("../models/Product.model")
const express = require('express');
const { verifyToken, verifyAdmin } = require("../middlewares/auth.middlewares")
const Purchase = require("../models/Purchase.model")

// ℹ️ Organize and connect all your route files here.


// auth route 

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

//!exemple private route wish to kkep private  delte for the project 
router.get("/example-private-route", verifyToken, (req, res) => {
  // console.log(req.headers)

  //! IN THE ROUTE you might need info about the user
  console.log(req.payload)


  res.send("Here is your user specific private information")
})

router.get("/example-admin-route", verifyToken, verifyAdmin, (req, res) => {
  res.send("here is your SUPER SECRET admin only information")
})

// product route

// all products

const productsRoutes = require("./products.routes")
router.use("/products", productsRoutes)

const commentsRoutes = require("./comments.routes")
router.use("/comments", commentsRoutes)


//purchase
const purchaseRoutes = require("./purchases.routes")
router.use("/purchases", purchaseRoutes)

const modifyUserRoutes =  require("./user.routes")
router.use("/user" , modifyUserRoutes)


module.exports = router;
