const express = require("express");

const cors = require("cors");

const helmet = require("helmet");

const morgan = require("morgan");



const productRoutes = require("./routes/productRoutes");



const app = express();



// MIDDLEWARES
app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());



// TEST ROUTE
app.get("/", (req, res) => {

    res.send("Ecommerce Payment Flow API Running");
});



// ROUTES
app.use("/api/products", productRoutes);



module.exports = app;