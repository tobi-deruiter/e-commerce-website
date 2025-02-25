const FileController = require("../controllers/file.controller")
const multer = require("multer");

const storage = new multer.memoryStorage();
const upload = multer({ storage });

const uploadFileToMemory = upload.single("file");

async function uploadFile(req, res, next) {
    uploadFileToMemory(req, res, async (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            });
        }
        if (!req.file) {
            return next();
        }

        const uploadResult = await FileController.uploadFile(req, res);
        if (!uploadResult.success) {
            return next(uploadResult.error);
        }

        res.locals.image_id = uploadResult.image_id;
        res.locals.image_url = uploadResult.image_url;
        next();
    })
}

module.exports = uploadFile;