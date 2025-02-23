const mongoose = require("./config");

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
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
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})

module.exports = Product