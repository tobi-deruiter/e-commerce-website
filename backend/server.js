const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routers
const productRouter = require("./routes/product.router")

app.use("/products", productRouter)

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        error: "Internal Server Error"
    });
})

const port = process.env.PORT || 4000;
app.listen(port, (error)=>{
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error: " + error);
    }
})