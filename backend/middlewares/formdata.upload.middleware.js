const multer = require("multer");

const storage = new multer.memoryStorage();
const upload = multer({ storage });

const uploadFormData = upload.none();

module.exports = uploadFormData;