const razorpayInstance =
    require("../config/razorpay");



/*
  CREATE RAZORPAY ORDER

  Razorpay expects amount in paise

  Example:
  ₹500 = 50000 paise
*/

const createRazorpayOrder =
    async (amount) => {

        const options = {

            amount: amount * 100,

            currency: "INR",

            receipt:
                "receipt_" + Date.now(),
        };



        const razorpayOrder =
            await razorpayInstance.orders.create(
                options
            );



        return razorpayOrder;
    };



module.exports = {
    createRazorpayOrder,
};