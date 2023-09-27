import React from "react";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  return (
    <div
      // to={`/product/${product._id}`}
      className="p-3 sm:p-5 md:p-10 glass m-5 rounded-md "
    >
      <div className="h-[300px] rounded-md flex items-center justify-center overflow-hidden">
        <img
          className="rounded-md"
          src={product.images[0].image}
          alt={product.name}
        />
      </div>
      <div className="mt-3">
        <Link to={`/product/${product._id}`}> {product.name}</Link>
        <p className="text-sm mt-2 text-gray-400">{product.description}</p>
      </div>
      <div className="flex items-center justify-between mt-5">
        <p className="">
          ₹ {product.price} <span></span>{" "}
        </p>

        <Link
          to={`/product/${product._id}`}
          className="bg-mydark cursor-pointer px-3 py-1 rounded-md text-mywhite hover:scale-105"
        >
          {/* Add to Basket */}
          View Details
        </Link>
      </div>
    </div>
  );
}
