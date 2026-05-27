const Product = require("../models/product");



/*
  GET ALL PRODUCTS
*/

const getAllProducts = async (req, res) => {

    try {

        const products = await Product.find();

        res.status(200).json({

            success: true,

            count: products.length,

            products,
        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: "Failed to fetch products",
        });
    }
};




/*
  SEED MOCK PRODUCTS

  Purpose:
  Insert demo ecommerce products into MongoDB
*/

const seedProducts = async (req, res) => {

    try {

        // CLEAR OLD PRODUCTS
        await Product.deleteMany();



        // DEMO PRODUCTS
        const demoProducts = [

            {
                name: "Nike Running Shoes",

                price: 2999,

                image:
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff",

                description: "Comfortable running shoes for daily workouts",
            },

            {
                name: "Wireless Headphones",

                price: 1999,

                image:
                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",

                description: "Noise cancellation wireless headphones",
            },

            {
                name: "Smart Watch",

                price: 4999,

                image:
                    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",

                description: "Track fitness and notifications",
            },

            {
                name: "Casual T-Shirt",

                price: 799,

                image:
                    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",

                description: "Soft cotton everyday t-shirt",
            },
        ];



        // INSERT PRODUCTS
        const insertedProducts = await Product.insertMany(
            demoProducts
        );



        res.status(201).json({

            success: true,

            message: "Demo products inserted",

            count: insertedProducts.length,

            products: insertedProducts,
        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: "Failed to seed products",
        });
    }
};




module.exports = {
    getAllProducts,
    seedProducts,
};