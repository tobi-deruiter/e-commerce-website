const express = require("express");
const router = express.Router();

router.use("/upload", require("./upload"));
router.use("/get", require("./get"));

module.exports = router