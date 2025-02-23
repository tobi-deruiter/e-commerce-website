const express = require("express");
const router = express.Router();
const Product = require("../../utils/mongodb/productModel");

router.post('/', async (req, res)=>{
    let products = await Product.find({});
    let id;
    if (products.length>0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image_url: req.body.image_url,
        image_id: req.body.image_id,
        tags: req.body.tags,
        price: req.body.price,
    })
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

module.exports = router