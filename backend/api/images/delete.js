const express = require("express");
const router = express.Router();
const handleDestroy = require("../../utils/cloudinary/handleDestroy")

router.post("/", async (req, res) => {
    try {
        const cldRes = await handleDestroy(req.body.public_id, req.body.recource_type);
        res.status(200).json(cldRes);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: error.message,
        });
    }
});

module.exports = router  