const express = require("express");

const router = express.Router();



const {
    seedUser,
} = require("../controllers/userController");



/*
  CREATE DEMO USER
*/

router.post("/seed", seedUser);



module.exports = router;