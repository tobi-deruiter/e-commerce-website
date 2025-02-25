const Product = require("../models/product.model");

class ProductController {

    /**
     * Product search function.
     * This function will search through all products using a search query and given filters.
     * It will filter results based on what is given (tags, price range, quantity range, sales range, date range).
     * It will also sort based on given sorting options (lowest_price, highest_price, lowest_quantity, highest_quantity,
     *      popular, alphabetically, earliest_date, latest_date, or default: relevance)
     * 
     * By defualt this will return all products.
     * 
     * @param {*} searchData 
     */
    static async searchProducts(searchData) {
        let result = {
            success: true,
        };

        const searchRegex = (!searchData.search) ? ".*" : searchData.search;
        const search = new RegExp(searchRegex, 'i');
        const tags = (!searchData.tags) ? await Product.distinct("tags") : searchData.tags;
        const min_price = (!searchData.min_price) ? Number.NEGATIVE_INFINITY : searchData.min_price;
        const max_price = (!searchData.max_price) ? Number.POSITIVE_INFINITY : searchData.max_price;
        const available = (!searchData.available) ? true : searchData.available;
        const min_quantity = (!searchData.min_quantity) ? Number.NEGATIVE_INFINITY : searchData.min_quantity;
        const max_quantity = (!searchData.max_quantity) ? Number.POSITIVE_INFINITY : searchData.max_quantity;
        const min_sales = (!searchData.min_quantity) ? Number.NEGATIVE_INFINITY : searchData.min_sales;
        const max_sales = (!searchData.max_quantity) ? Number.POSITIVE_INFINITY : searchData.max_sales;
        const min_date = (!searchData.min_date) ? new Date(-8640000000000000) : new Date(searchData.min_date);
        const max_date = (!searchData.max_date) ? new Date(8640000000000000) : new Date(searchData.max_date);

        const sort = (!searchData.sort) ? "relevance" : searchData.sort;
        
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
            result = {
                success: false,
                error: err.message,
            };
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

        return (!result.success) ? result : 
        {
            success: true,
            products: products,
        };
    }

    /**
     * This function will return all products with the given product ids in the array
     *      productData.product_ids
     * 
     * @param {*} productData 
     */
    static async getProductsById(productData) {
        let result = {
            success: true,
        };

        const products = await Product.find({
            _id: { $in: productData.product_ids }
        }).catch(err => {
            console.log("Could not get products: " + err)
            result = {
                success: false,
                error: err.message,
            };
        });
    
        return (!result.success) ? result :
        {
            success: true,
            products: products,
        };
    }

    /**
     * This function will upload a product to the connected MongoDB database with the given information.
     * 
     * Information needed:
     *      Title: String
     *      Description: String
     *      Image
     * 
     * @param {*} productData 
     * @param {*} productImageData 
     */
    static async uploadProduct(productData, productImageData) {
        let result = {
            success: true,
        };

        const product = new Product({
            title: productData.title,
            description: productData.description,
            image_id: productImageData.file_id,
            image_url: productImageData.file_url,
            tags: productData.tags,
            price: productData.price,
        });
        await product.save().catch(err => {
            console.log("Could not save product: " + err);
            result = {
                success: false,
                error: err.message,
            };
        });

        return (!result.success) ? result :
        {
            success: true,
            product_id: product._id
        };
    }

    static async deleteProducts(productData) {
        let result = {
            success: true,
        };

        if (!productData.product_ids || productData.product_ids.length == 0) {
            result = {
                success: false,
                error: "No ids given",
            };
        }
        const products = await Product.find({
            _id: { $in: productData.product_ids }
        }).catch(err => {
            console.log(err);
            result = {
                success: false,
                error: err.message,
            };
        });
        
        Product.deleteMany({
            _id: { $in: productData.product_ids }
        }).catch(err => {
            console.log(err);
            result = {
                success: false,
                error: err.message,
            };
        });
    
        return (!result.success) ? result :
        {
            success: true,
            products: products,
        };
    }

    static async updateProduct(productData, productImageData) {
        let result = {
            success: true,
        };

        if (!productData.product_id) {
            result = {
                success: false,
                error: "Update product: no id given.",
            };
        }
    
        const product = await Product.findById(productData.product_id).catch(err => {
            console.log("Could not get product: " + err)
            result = {
                success: false,
                error: err.message,
            };
        });
    
        product.title = (!productData.title) ? product.title : productData.title;
        product.description = (!productData.description) ? product.description : productData.description;
        product.tags = (!productData.tags) ? product.tags : productData.tags;
        product.price = (!productData.price) ? product.price : productData.price;
        product.available = (!productData.available) ? product.available : productData.available;
        product.quantity = (!productData.quantity) ? product.quantity : productData.quantity;
    
        // save old image id to delete later if it is being replaced by a new image
        const oldImageId = (!productImageData.file_id) ? null : product.image_id;
        
        product.image_id = (!productImageData.file_id) ? product.image_id : productImageData.file_id;
        product.image_url = (!productImageData.file_url) ? product.image_url : productImageData.file_url;

        await product.save().catch(err => {
            console.log("Could not save product: " + err)
            result = {
                success: false,
                error: err.message,
            };
        });

        return (!result.success) ? result :
        {
            success: true,
            oldImageId: oldImageId
        };
    }
}

module.exports = ProductController;