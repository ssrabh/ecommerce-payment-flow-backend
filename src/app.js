const express = require("express");

const cors = require("cors");

const helmet = require("helmet");

const morgan = require("morgan");


const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes =
    require("./routes/orderRoutes");
const paymentRoutes =
    require("./routes/paymentRoutes");



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
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);


module.exports = app;