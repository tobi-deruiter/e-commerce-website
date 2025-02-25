const mongoose = require("../configs/mongodb.config");

const Product = mongoose.model("Product", {
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    image_id: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    price: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
    quantity: {
        type: Number,
        default: -1,
    },
    sales: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = Product