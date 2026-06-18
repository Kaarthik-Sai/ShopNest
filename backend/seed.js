import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import User from "./model/user.js";
import Product from "./model/product.js";

dotenv.config();

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "john123",
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: "jane123",
    isAdmin: false,
  },
];

const products = [
  {
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 99.99,
    imageUrl: "https://via.placeholder.com/300?text=Headphones",
    category: "Electronics",
    stock: 25,
    ratings: 4.5,
    numReviews: 12,
  },
  {
    name: "Smart Watch",
    description: "Fitness tracking smart watch with heart rate monitor.",
    price: 149.99,
    imageUrl: "https://via.placeholder.com/300?text=Smart+Watch",
    category: "Wearables",
    stock: 30,
    ratings: 4.3,
    numReviews: 8,
  },
  {
    name: "Running Shoes",
    description: "Comfortable running shoes with breathable mesh.",
    price: 79.99,
    imageUrl: "https://via.placeholder.com/300?text=Running+Shoes",
    category: "Footwear",
    stock: 40,
    ratings: 4.7,
    numReviews: 20,
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with deep bass.",
    price: 59.99,
    imageUrl: "https://via.placeholder.com/300?text=Speaker",
    category: "Electronics",
    stock: 15,
    ratings: 4.2,
    numReviews: 14,
  },
];

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce",
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Product.deleteMany();

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      })),
    );

    const createdUsers = await User.insertMany(hashedUsers);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    await Product.insertMany(sampleProducts);

    console.log("Data Imported Successfully");
    process.exit();
  } catch (error) {
    console.error("Error Importing Data:", error);
    process.exit(1);
  }
};

importData();
