const express = require("express");

const router = express.Router();



const {

  createOrder,

  getAllOrders,

  getSingleOrder,
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

router.get("/:id", getSingleOrder);



module.exports = router;

