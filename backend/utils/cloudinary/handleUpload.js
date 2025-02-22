const cloudinary = require("./config");

async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
    });
    return res;
}

module.exports = handleUpload;