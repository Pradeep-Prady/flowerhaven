const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter a Product Name"],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 characters"],
  },
  price: { type: Number, default: 0.0 },
  description: {
    type: String,
    required: [true, "Please Enter a Product Description"],
  },
  ratings: {
    type: String,
    default: 0,
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter a Product Category"],
    enum: {
      values: [
        "Alstroemeria",
        "Carnations",
        "Casa Blanca Lilies",
        "Chrysanthemums",
        "Daffodils",
        "Daisies",
        "Gerbera Daisies",
        "Gladiolus",
        "Hydrangeas",
        "Iris",
        "Lilies",
        "Orchids",
        "Peonies",
        "Rose",
        "Sunflowers",
        "Tulips",
      ],
      message: "Please select correct category",
    },
  },
  seller: {
    type: String,
    required: [true, "Please Enter a Product Seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter a Product Stock"],
    maxlength: [20, "Product Stock cannot exceed 20"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

let schema = mongoose.model("Product", productSchema);

module.exports = schema;
