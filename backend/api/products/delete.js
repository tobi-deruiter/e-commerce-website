const express = require("express");
const router = express.Router();
const Product = require("../../utils/mongodb/productModel");
const eventHandler = require("../../utils/events/eventHandler");

router.post('/', async (req, res)=>{
    if (!req.body.product_ids) {
        res.status(400).json({
            success: false,
            error: "No ids given"
        })
    }
    const products = await Product.find({
        _id: { $in: req.body.product_ids }
    }).catch(err => {
        res.status(400).json({
            success: false,
            error: err,
        });
    });

    products.forEach(product => {
        eventHandler.emit("productDeleted", {
            image_id: product.image_id,
            resource_type: "image"
        });
    });

    Product.deleteMany({
        _id: { $in: req.body.product_ids }
    }).catch(err => {
        res.status(400).json({
            success: false,
            error: err,
        });
    });

    res.status(200).json({
        success: true,
    })
})

module.exports = router