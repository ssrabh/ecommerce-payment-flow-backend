const mongoose = require("mongoose");



/*
  SINGLE PRODUCT INSIDE ORDER
*/

const orderItemSchema = new mongoose.Schema({

    product: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Product",

        required: true,
    },

    quantity: {

        type: Number,

        required: true,

        default: 1,
    },

    price: {

        type: Number,

        required: true,
    },

}, {
    _id: false,
});



/*
  MAIN ORDER SCHEMA
*/

const orderSchema = new mongoose.Schema({

    // ORDER OWNER
    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
    },



    // PRODUCTS
    items: [orderItemSchema],



    // TOTAL PRICE
    totalAmount: {

        type: Number,

        required: true,
    },



    // PAYMENT STATUS
    paymentStatus: {

        type: String,

        enum: [
            "PENDING",
            "PAID",
            "FAILED",
        ],

        default: "PENDING",
    },



    // ORDER STATUS
    orderStatus: {

        type: String,

        enum: [
            "CREATED",
            "PROCESSING",
            "SHIPPED",
            "DELIVERED",
        ],

        default: "CREATED",
    },



    // RAZORPAY ORDER ID
    razorpayOrderId: {

        type: String,
    },



    // RAZORPAY PAYMENT ID
    razorpayPaymentId: {

        type: String,
    },

}, {
    timestamps: true,
});



module.exports = mongoose.model(
    "Order",
    orderSchema
);