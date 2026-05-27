const Razorpay = require("razorpay");



/*
  RAZORPAY INSTANCE

  This object allows backend
  to communicate with Razorpay APIs
*/

const razorpayInstance = new Razorpay({

    key_id: process.env.RAZORPAY_KEY_ID,

    key_secret:
        process.env.RAZORPAY_KEY_SECRET,
});



module.exports = razorpayInstance;