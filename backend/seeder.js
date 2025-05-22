const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product")
const User = require("./models/User");
const products = require("./data/products");
const Cart = require("./models/Cart");


dotenv.config();

// Connect to mongoose
mongoose.connect(process.env.MONGO_URI);

// Function to seed data

const seedData = async () => {
    try {
        // Clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        // Create a default admin User

        const createdUser = await User.create({
            name : "Admin User",
            email : "admin@example.com",
            password : "123456",
            role : "admin",
        });

        // Assign the default user ID to each product 
        const userID = createdUser.id;
        const sampleProduct = products.map((product) => {
            return {...product ,user :  userID}
        });

        // Inset the products into the database
        await Product.insertMany(sampleProduct);

        console.log("Product data seeded successfully!");
        process.exit();
    }
    catch (error){
        console.log("Error seeding in the data : " , error);
        process.exit(1);
    }
};



seedData();