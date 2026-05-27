const mongoose = require("mongoose");



const paymentSchema = new mongoose.Schema({

    // BUSINESS ORDER
    order: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Order",

        required: true,
    },



    // RAZORPAY ORDER ID
    razorpayOrderId: {

        type: String,

        required: true,
    },



    // RAZORPAY PAYMENT ID
    razorpayPaymentId: {

        type: String,
    },



    // PAYMENT SIGNATURE
    razorpaySignature: {

        type: String,
    },



    // AMOUNT
    amount: {

        type: Number,

        required: true,
    },



    // PAYMENT STATUS
    status: {

        type: String,

        enum: [
            "CREATED",
            "SUCCESS",
            "FAILED",
        ],

        default: "CREATED",
    },

}, {
    timestamps: true,
});



module.exports = mongoose.model(
    "Payment",
    paymentSchema
);