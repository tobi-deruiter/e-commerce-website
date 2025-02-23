const port = 4000;
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

// API Creation
app.get("/", (req, res)=>{
    res.send("Express App is Running")
})

// Image Management Router
app.use("/images", require("./api/images/_Router"))
app.use("/products", require("./api/products/_Router"))

app.listen(port, (error)=>{
    if (!error) {
        console.log("Server Running on Port " + port)
    } else {
        console.log("Error: " + error)
    }
})