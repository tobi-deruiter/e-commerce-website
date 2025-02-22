const cloudinary = require("./config");

async function handleDestroy(public_id, recource_type) {
    const res = await cloudinary.uploader.destroy(public_id, {
        resource_type: recource_type,
    });
    return res;
}

module.exports = handleDestroy;