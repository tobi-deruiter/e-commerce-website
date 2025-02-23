const express = require("express");
const router = express.Router();

router.use("/upload", require("./upload"));
router.use("/search", require("./search"));
router.use("/delete", require("./delete"));
router.use("/update", require("./update"));

module.exports = router