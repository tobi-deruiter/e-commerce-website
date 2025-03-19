const cloudinary = require("../configs/cloudinary.config");

class FileController {
    static async handleUpload(file) {
        const res = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
        });
        return res;
    }

    static async handleDestroy(public_id, resource_type) {
        const res = await cloudinary.uploader.destroy(public_id, {
            resource_type: resource_type,
        });
        return res;
    }

    static async uploadFile(file) {
        if (!file) {
            return {
                success: false,
                error: "No file attached",
            };
        }

        try {
            const b64 = Buffer.from(file.buffer).toString("base64");
            let dataURI = "data:" + file.mimetype + ";base64," + b64;
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
                error: err.message
            };
        }
    }

    static async deleteFile(imageData) {
        try {
            await this.handleDestroy(imageData.public_id, imageData.resource_type);
            return { success: true };
        } catch (err) {
            console.log(err);
            return {
                success: false,
                error: err.message
            };
        }
    }
}

module.exports = FileController;