const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

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