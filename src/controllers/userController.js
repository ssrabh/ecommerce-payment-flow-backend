const User = require("../models/user");



/*
  CREATE DEMO USER
*/

const seedUser = async (req, res) => {

    try {

        // REMOVE OLD USERS
        await User.deleteMany();



        // CREATE DEMO USER
        const user = await User.create({

            name: "Saurabh",

            email: "saurabh@test.com",
        });



        res.status(201).json({

            success: true,

            message: "Demo user created",

            user,
        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: "Failed to create demo user",
        });
    }
};



module.exports = {
    seedUser,
};