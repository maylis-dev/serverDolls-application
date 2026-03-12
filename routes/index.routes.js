const router = require("express").Router();
const Product = require("../models/Product.model")
const express = require('express');
const { verifyToken, verifyAdmin } = require("../middlewares/auth.middlewares")
const Purchase = require("../models/Purchase.model")

// ℹ️ Organize and connect all your route files here.


// auth route 

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)





// product route

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);


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
