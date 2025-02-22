const express = require("express");
const router = express.Router();

router.use("/upload", require("./upload"));
router.use("/delete", require("./delete"));

module.exports = router