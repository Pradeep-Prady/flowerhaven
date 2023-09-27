import React from "react";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div>
      <div>{/* image */}</div>

      <div>
        <Link to="/orders">Orders</Link>
      </div>
    </div>
  );
}
