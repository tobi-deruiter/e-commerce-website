const express = require("express");
const router = express.Router();
const Product = require("../../utils/mongodb/productModel");

router.get('/all', async (req, res)=>{
    let products = await Product.find({});
    res.send(products)
});

router.get('/by_ids', async (req, res)=>{
    let products = await Product.find({
        id: { $in: req.body.product_ids }
    });
    res.send(products)
});

router.get('/by_tags', async (req, res)=>{
    let products = await Product.aggregate([{
        $match: {
            tags: { $in: req.body.tags }
        }
    }]);
    res.send(products)
});

module.exports = router