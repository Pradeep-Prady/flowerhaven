const mongoose = require("mongoose");

const dotenv = require("dotenv");
const path = require('path');
 
dotenv.config({ path: path.join(__dirname, "/config.env") });


const uri = process.env.DB_LOCAL_URI;

console.log(uri);

const connectDatabase = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`Database connection established to ${con.connection.host}`);
    })
    .catch((err) => {
      console.log(`Database connection error: ${err}`);
    });
};

module.exports = connectDatabase;
