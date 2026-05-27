const Order = require("../models/order");

const Payment = require("../models/payment");



const {
    createRazorpayOrder,
} = require(
    "../services/paymentService"
);



const verifySignature =
    require("../utils/verifySignature");



/*
  CREATE RAZORPAY PAYMENT ORDER
*/

const createPaymentOrder =
    async (req, res) => {

        try {

            const {
                businessOrderId,
            } = req.body;



            /*
              FIND BUSINESS ORDER
            */

            const order =
                await Order.findById(
                    businessOrderId
                );



            if (!order) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Business order not found",
                });
            }



            /*
              CREATE RAZORPAY ORDER
            */

            const razorpayOrder =
                await createRazorpayOrder(
                    order.totalAmount
                );



            /*
              SAVE PAYMENT RECORD
            */

            const payment =
                await Payment.create({

                    order: order._id,

                    razorpayOrderId:
                        razorpayOrder.id,

                    amount:
                        order.totalAmount,
                });



            /*
              SAVE RAZORPAY ORDER ID
              INSIDE BUSINESS ORDER
            */

            order.razorpayOrderId =
                razorpayOrder.id;

            await order.save();



            /*
              RESPONSE TO FRONTEND
            */

            res.status(201).json({

                success: true,

                message:
                    "Razorpay order created",

                businessOrderId:
                    order._id,

                razorpayOrder: {

                    id: razorpayOrder.id,

                    amount:
                        razorpayOrder.amount,

                    currency:
                        razorpayOrder.currency,
                },

                payment,
            });

        } catch (error) {

            console.log(error);



            res.status(500).json({

                success: false,

                message:
                    "Failed to create payment order",
            });
        }
    };





/*
  VERIFY PAYMENT
*/

const verifyPayment =
    async (req, res) => {

        try {

            const {

                razorpay_order_id,

                razorpay_payment_id,

                razorpay_signature,

            } = req.body;



            /*
              VERIFY SIGNATURE
            */

            const isAuthentic =
                verifySignature(

                    razorpay_order_id,

                    razorpay_payment_id,

                    razorpay_signature
                );



            if (!isAuthentic) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid payment signature",
                });
            }



            /*
              FIND PAYMENT RECORD
            */

            const payment =
                await Payment.findOne({

                    razorpayOrderId:
                        razorpay_order_id,
                });



            if (!payment) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Payment record not found",
                });
            }



            /*
              UPDATE PAYMENT
            */

            payment.status = "SUCCESS";

            payment.razorpayPaymentId =
                razorpay_payment_id;

            payment.razorpaySignature =
                razorpay_signature;

            await payment.save();



            /*
              UPDATE BUSINESS ORDER
            */

            const order =
                await Order.findById(
                    payment.order
                );



            if (order) {

                order.paymentStatus =
                    "PAID";

                order.razorpayPaymentId =
                    razorpay_payment_id;

                await order.save();
            }



            res.status(200).json({

                success: true,

                message:
                    "Payment verified successfully",
            });

        } catch (error) {

            console.log(error);



            res.status(500).json({

                success: false,

                message:
                    "Payment verification failed",
            });
        }
    };





module.exports = {

    createPaymentOrder,

    verifyPayment,
};