const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNECT);

module.exports = mongoose