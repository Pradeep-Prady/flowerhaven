import { Link, useNavigate } from "react-router-dom";

import React from "react";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="bg-mydark w-full h-full text-mywhite ">
      <div className="py-5 px-3 md:p-7">
        <div className="my-2 ">
          <Link to="/admin/dashboard">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
        </div>
        <div className="my-2 md:my-5 ">
          <h2 className="my-4">Products</h2>
          <div className="my-2 ml-2">
            <Link to="/admin/products">
              <i className="fa fa-shopping-basket"></i> All Products
            </Link>
          </div>
          <div className="my-2 ml-2 md:my-5 ">
            <button onClick={() => navigate("/admin/products/create")}>
              <i className="fa fa-plus"> </i> Create
            </button>
          </div>
        </div>
        <div className="my-2  md:my-5 ">
          <Link to="/admin/orders">
            <i className="fa fa-shopping-basket"></i> Orders
          </Link>
        </div>
        <div className="my-2 md:my-5">
          <Link to="/admin/users">
            <i className="fa fa-users"></i> Users
          </Link>
        </div>
        <div className="my-2 md:my-5">
          <Link to="/admin/reviews">
            <i className="fa fa-users"></i> Reviews
          </Link>
        </div>
      </div>
    </div>
  );
}
