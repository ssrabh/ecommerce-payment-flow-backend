const express = require("express");

const router = express.Router();



const {

    createOrder,

    getAllOrders,

} = require(
    "../controllers/orderController"
);



/*
  CREATE ORDER
*/

router.post("/", createOrder);



/*
  GET ALL ORDERS
*/

router.get("/", getAllOrders);



module.exports = router;