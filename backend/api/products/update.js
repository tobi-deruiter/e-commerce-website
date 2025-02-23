const express = require("express");
const router = express.Router();
const Product = require("../../utils/mongodb/productModel");

router.post('/', async (req, res)=>{
    const products = Product.find
    res.status(200).json({
        success: true,
    })
})

module.exports = router