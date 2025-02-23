const express = require("express");
const router = express.Router();
const multer = require("multer");
const handleUpload = require("../../utils/cloudinary/handleUpload")

const storage = new multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        const image_id = cldRes.public_id;
        const image_url = cldRes.secure_url;
        res.status(200).json({
            image_id: image_id,
            image_url: image_url,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: error.message,
        });
    }
});

module.exports = router  