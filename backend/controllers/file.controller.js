const cloudinary = require("../configs/cloudinary.config");

class FileController {
    async handleUpload(file) {
        const res = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
        });
        return res;
    }

    async handleDestroy(public_id, resource_type) {
        const res = await cloudinary.uploader.destroy(public_id, {
            resource_type: resource_type,
        });
        return res;
    }

    async uploadFile(req, res) {
        if (!req.file) {
            return {
                success: false,
                error: "No file attached",
            };
        }

        try {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            const cldRes = await this.handleUpload(dataURI);
            const file_id = cldRes.public_id;
            const file_url = cldRes.secure_url;
            return {
                success: true,
                file_id: file_id,
                file_url: file_url,
            };
        } catch (err) {
            console.log(err);
            return {
                success: false,
                error: err
            };
        }
    }

    async deleteFile(imageData) {
        try {
            await handleDestroy(imageData.public_id, imageData.resource_type);
            return { success: true };
        } catch (err) {
            console.log(err);
            return {
                success: false,
                error: err
            };
        }
    }
}

module.exports = FileController;