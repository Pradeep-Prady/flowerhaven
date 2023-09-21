const products = require("../data/product.json");
const Product = require("../models/productModel");

const dotenv = require("dotenv");
const path = require('path');

const connectDatabase = require("../config/database");
// dotenv.config({ path: " /config/config.env" });
dotenv.config({ path: path.join(__dirname, "../config/config.env") });


connectDatabase();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products deleted");
    await Product.insertMany(products);
    console.log("Products Inserted");
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};
seedProducts();
