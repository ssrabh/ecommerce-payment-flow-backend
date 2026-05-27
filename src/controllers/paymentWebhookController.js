const crypto = require("crypto");

const Payment = require("../models/Payment");

const Order = require("../models/Order");



/*
  HANDLE RAZORPAY WEBHOOK
*/

const handleWebhook = async (
    req,
    res
) => {

    try {

        /*
          GET SIGNATURE
        */

        const razorpaySignature =

            req.headers[
            "x-razorpay-signature"
            ];



        /*
          VERIFY SIGNATURE
        */

        const expectedSignature =

            crypto
                .createHmac(

                    "sha256",

                    process.env
                        .RAZORPAY_WEBHOOK_SECRET
                )

                .update(req.body)

                .digest("hex");



        /*
          INVALID WEBHOOK
        */

        if (
            razorpaySignature !==
            expectedSignature
        ) {

            console.log(
                "Invalid webhook signature"
            );

            return res.status(400).json({

                success: false,

                message:
                    "Invalid webhook signature",
            });
        }



        /*
          PARSE EVENT DATA
        */

        const event = JSON.parse(
            req.body.toString()
        );



        console.log(
            "================================="
        );

        console.log("WEBHOOK RECEIVED");

        console.log(
            "================================="
        );

        console.log(event.event);



        /*
          PAYMENT CAPTURED
        */

        if (
            event.event ===
            "payment.captured"
        ) {

            const paymentEntity =

                event.payload.payment.entity;



            const razorpayOrderId =

                paymentEntity.order_id;



            const razorpayPaymentId =

                paymentEntity.id;



            console.log(
                "PAYMENT CAPTURED"
            );

            console.log(
                razorpayPaymentId
            );



            /*
              FIND PAYMENT
            */

            const payment =
                await Payment.findOne({

                    razorpayOrderId,
                });



            if (payment) {

                /*
                  UPDATE PAYMENT
                */

                payment.status =
                    "SUCCESS";

                payment.razorpayPaymentId =
                    razorpayPaymentId;

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
                        razorpayPaymentId;

                    await order.save();
                }



                console.log(
                    "DATABASE UPDATED"
                );
            }
        }



        /*
          WEBHOOK SUCCESS RESPONSE
        */

        res.status(200).json({

            success: true,
        });

    } catch (error) {

        console.log(error);



        res.status(500).json({

            success: false,

            message:
                "Webhook processing failed",
        });
    }
};



module.exports = {
    handleWebhook,
};