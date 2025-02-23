const express = require("express");
const router = express.Router();
const Product = require("../../utils/mongodb/productModel");

router.post('/one', async (req, res)=>{
    const productArray = await Product.find({
        _id: req.body.product_id
    }).catch(err => {
        console.log("Could not get products: " + err)
        res.status(400).json({
            success: false,
            error: err,
        });
    });

    const product = productArray[0];

    // TODO: check for all product fields in req.body, set defaults to
    //          stay the same as before
    //      if image changes, delete previous image by calling eventHandler
    
})

// TODO: create update many post where only tags, price, quantity, and availability can be changed

module.exports = router