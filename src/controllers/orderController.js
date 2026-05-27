const Order = require("../models/order");

const User = require("../models/user");

const Product = require("../models/product");



/*
  CREATE BUSINESS ORDER
*/

const createOrder = async (req, res) => {

    try {

        const {
            userId,
            items,
        } = req.body;



        /*
          VALIDATE USER
        */

        const user = await User.findById(
            userId
        );



        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found",
            });
        }



        /*
          PREPARE ORDER ITEMS
        */

        let orderItems = [];

        let totalAmount = 0;



        for (const item of items) {

            const product =
                await Product.findById(
                    item.productId
                );



            if (!product) {

                return res.status(404).json({

                    success: false,

                    message: "Product not found",
                });
            }



            const quantity =
                item.quantity || 1;



            const itemTotal =
                product.price * quantity;



            totalAmount += itemTotal;



            orderItems.push({

                product: product._id,

                quantity,

                price: product.price,
            });
        }



        /*
          CREATE ORDER
        */

        const order = await Order.create({

            user: user._id,

            items: orderItems,

            totalAmount,
        });



        res.status(201).json({

            success: true,

            message:
                "Business order created",

            order,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message:
                "Failed to create order",
        });
    }
};




/*
  GET ALL ORDERS
*/

const getAllOrders = async (
    req,
    res
) => {

    try {

        const orders = await Order.find()

            .populate("user")

            .populate("items.product");



        res.status(200).json({

            success: true,

            count: orders.length,

            orders,
        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Failed to fetch orders",
        });
    }
};




module.exports = {

    createOrder,

    getAllOrders,
};