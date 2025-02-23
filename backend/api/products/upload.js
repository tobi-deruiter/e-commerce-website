const express = require("express");
const router = express.Router();
const Product = require("../../utils/mongodb/productModel");

router.post('/', async (req, res)=>{
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        image_id: req.body.image_id,
        image_url: req.body.image_url,
        tags: req.body.tags,
        price: req.body.price,
    });
    await product.save().catch(err => {
        console.log("Could not save product: " + err)
        res.status(400).json({
            success: false,
            error: err,
        });
    });
    res.status(200).json({
        success: true,
        product_id: product._id
    })
})

module.exports = router