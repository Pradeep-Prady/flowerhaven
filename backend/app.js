const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const errorMiddleware = require("./middlewares/error");


dotenv.config({ path: path.join(__dirname, "config/config.env") });


app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const auth = require("./routes/auth");
const products = require("./routes/product");



app.use("/api/v1/", auth);
app.use("/api/v1/", products);


app.use(errorMiddleware);

module.exports = app;
