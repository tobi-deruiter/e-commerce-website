const cloudinary = require("./config");

async function handleDestroy(public_id, resource_type) {
    const res = await cloudinary.uploader.destroy(public_id, {
        resource_type: resource_type,
    });
    return res;
}

module.exports = handleDestroy;