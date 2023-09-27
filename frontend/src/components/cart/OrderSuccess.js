import React from "react";
import { Link } from "react-router-dom";
import loader from "../../assets/loader.png";

export default function OrderSuccess() {
  return (
    <div className="w-full h-auto">
      <div className=" w-auto h-auto flex items-center justify-center ">
        <img src={loader} alt="Success" />
      </div>

      <div className="text-center">
        <Link className="btn" to="/orders">
          Go Orders
        </Link>
      </div>
    </div>
  );
}
