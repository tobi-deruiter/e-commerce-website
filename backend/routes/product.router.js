const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller")
const FileController = require("../controllers/file.controller")
const uploadFile = require("../middlewares/file.upload.middleware")

// default /products endpoint is to search products by search term with filters and sorting
router.get("/", async (req, res) => {
    const searchData = req.body;
    const searchResult = await ProductController.searchProducts(searchData);
    const status = (!searchResult.success) ? 500 : 200;
    res.status(status).send(searchResult);
});

// search by id instead of by search term/filters/sorting
router.get("/search-by-id", async (req, res) => {
    const productData = req.body;
    const searchByIdResult = await ProductController.getProductsById(productData);
    const status = (!searchByIdResult.success) ? 500 : 200;
    res.status(status).send(searchByIdResult);
});

// get/upload image, upload product with image info
router.post("/upload", uploadFile, async (req, res) => {
    if (!req.file) {
        return res.status(400).send({
            success: false,
            error: "No product image attached",
        });
    }

    const productData = req.body;
    const productImageData = res.locals;
    const uploadResult = await ProductController.uploadProduct(productData, productImageData);
    const status = (!uploadResult.success) ? 500 : 200;
    res.status(status).send(uploadResult);
});

// get product info, delete product, delete associated image with product info
router.post("/delete", async (req, res) => {
    const productData = req.body;
    const deleteResult = await ProductController.deleteProducts(productData);
    if (!deleteResult.success) {
        return res.status(500).send(deleteResult);
    }

    await deleteResult.products.forEach(async product => {
        const imageData = {
            public_id: product.image_id,
            resource_type: "image"
        };
        const deleteAssociatedImageResult = await FileController.deleteFile(imageData);

        if (!deleteAssociatedImageResult.success) {
            return res.status(500).send(deleteResult);
        }
    });

    res.status(200).send({ success: true });
});

// check if image changed, upload image, update product (with new? image info), (delete old image ?)
router.post("/update-one", uploadFile, async (req, res) => {
    const productData = req.body;
    const productImageData = res.locals;
    const updateResult = await ProductController.updateProduct(productData, productImageData);
    if (!updateResult.success) {
        return res.status(500).send(updateResult);
    }

    if (updateResult.oldImageId) {
        const imageData = {
            public_id: updateResult.oldImageId,
            resource_type: "image"
        };
        const deleteAssociatedImageResult = await FileController.deleteFile(imageData)
        if (!deleteAssociatedImageResult.success) {
            return res.status(500).send(deleteAssociatedImageResult);
        }
    }

    res.status(200).send({ success: true });
});

router.post("/update-many", async(req, res) => {
    const productData = req.body;
    const updateResult = await ProductController.updateManyProducts(productData);
    const status = (!updateResult.success) ? 500 : 200;
    res.status(status).send(updateResult);
})

module.exports = router