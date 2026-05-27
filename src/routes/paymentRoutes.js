const express = require("express");

const router = express.Router();



const {

    createPaymentOrder,

    verifyPayment,

} = require(
    "../controllers/paymentController"
);


const {
    handleWebhook,
} = require(
    "../controllers/paymentWebhookController"
);

/*
  CREATE RAZORPAY ORDER
*/

router.post(
    "/create-order",
    createPaymentOrder
);



/*
  VERIFY PAYMENT
*/

router.post(
    "/verify",
    verifyPayment
);


/*
  RAZORPAY WEBHOOK
*/
router.post(
    "/webhook",
    handleWebhook
);

module.exports = router;