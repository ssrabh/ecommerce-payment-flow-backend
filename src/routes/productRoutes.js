const express = require("express");

const router = express.Router();



const {
  getAllProducts,
  seedProducts,
} = require("../controllers/productController");



/*
  GET ALL PRODUCTS
*/

router.get("/", getAllProducts);



/*
  INSERT DEMO PRODUCTS
*/

router.post("/seed", seedProducts);



module.exports = router;