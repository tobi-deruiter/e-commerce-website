const express = require("express");
const router = express.Router();
const Product = require("../../utils/mongodb/productModel");

router.get('/', async (req, res)=>{
    const searchRegex = (!req.body.search) ? ".*" : req.body.search;
    const search = new RegExp(searchRegex, 'i');
    const tags = (!req.body.tags) ? await Product.distinct("tags") : req.body.tags;
    const min_price = (!req.body.min_price) ? Number.NEGATIVE_INFINITY : req.body.min_price;
    const max_price = (!req.body.max_price) ? Number.POSITIVE_INFINITY : req.body.max_price;
    const available = (!req.body.available) ? true : req.body.available;
    const min_quantity = (!req.body.min_quantity) ? Number.NEGATIVE_INFINITY : req.body.min_quantity;
    const max_quantity = (!req.body.max_quantity) ? Number.POSITIVE_INFINITY : req.body.max_quantity;
    const min_sales = (!req.body.min_quantity) ? Number.NEGATIVE_INFINITY : req.body.min_sales;
    const max_sales = (!req.body.max_quantity) ? Number.POSITIVE_INFINITY : req.body.max_sales;
    const min_date = (!req.body.min_quadate) ? new Date(-8640000000000000) : req.body.min_date;
    const max_date = (!req.body.max_quadate) ? new Date(8640000000000000) : req.body.max_date;

    const sort = (!req.body.sort) ? "relevance" : req.body.sort;
    
    const products = await Product.aggregate([
        { $match: {
            $and: [
                {
                    $or: [
                        { title: search },
                        { tags: search },
                        { description: search }
                    ]
                },
                { tags: { $in: tags } },
                { price: { $gte: min_price } },
                { price: { $lte: max_price } },
                { available: { $eq: available } },
                { quantity: { $gte: min_quantity } },
                { quantity: { $lte: max_quantity } },
                { sales: { $gte: min_sales } },
                { sales: { $lte: max_sales } },
                { date: { $gte: min_date } },
                { date: { $lte: max_date } },
            ]
        }},
        { $set: {
            relevance: {
                $sum: [
                    {$multiply: [{$size: {$regexFindAll: {input: "$title", regex: search}}}, 100]},
                    {$multiply: [{$size: {$regexFindAll: {input: {
                        $reduce: {
                            input: "$tags",
                            initialValue: "",
                            in: {$concat: ["$$value", " ", "$$this"]}
                        }
                    }, regex: search}}}, 50]},
                    {$multiply: [{$size: {$regexFindAll: {input: "$description", regex: search}}}, 30]},
                ]
            }
        }}
    ]).catch(err => {
        console.log("Could not get products: " + err)
        res.status(400).json({
            success: false,
            error: err,
        });
    });

    switch (sort) {
        case "lowest_price":
            products.sort((a, b) => a.price - b.price)
            break;
        case "highest_price":
            products.sort((a, b) => b.price - a.price)
            break;
        case "lowest_quantity":
            products.sort((a, b) => a.quantity - b.quantity)
            break;
        case "highest_quantity":
            products.sort((a, b) => b.quantity - a.quantity)
            break;
        case "popular":
            products.sort((a, b) => b.sales - a.sales)
            break;
        case "alphabetically":
            products.sort((a, b) => a.title.localeCompare(b.title))
            break;
        case "earliest_date":
            products.sort((a, b) => (new Date(a.date).getTime()) - (new Date(b.date).getTime()))
            break;
        case "latest_date":
            products.sort((a, b) => (new Date(b.date).getTime()) - (new Date(a.date).getTime()))
            break;
        default:    // sort by relevance in descending order (most to least relevant)
            products.sort((a, b) => b.relevance - a.relevance)
            break;
    }

    res.send(products)
});

router.get('/by_ids', async (req, res)=>{
    // TODO: check req.body parts
    let products = await Product.find({
        _id: { $in: req.body.product_ids }
    }).catch(err => {
        console.log("Could not get products: " + err)
        res.status(400).json({
            success: false,
            error: err,
        });
    });

    res.status(200).send(products)
});

module.exports = router