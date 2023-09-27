import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearError } from "../../slices/productSlice";
import { clearOrderDeleted } from "../../slices/orderSlice";
import {
  deleteOrder,
  adminOrders as adminOrdersAction,
} from "../../actions/orderActions";
import toast from "react-hot-toast";

export default function Orders() {
  const {
    adminOrders = [],
    loading = true,
    error,
    isOrderDeleted,
  } = useSelector((state) => state.orderState);

  const dispatch = useDispatch();

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        duration: 2000,
        style: {
          border: "1px solid white",
          background: "rgba(255, 255, 255, 0.08)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          color: "black",
        },
      });
      dispatch(clearError());
      return;
    }
    if (isOrderDeleted) {
      toast.success(`Order Deleted Successfully`, {
        position: "bottom-center",
        duration: 2000,
        style: {
          border: "1px solid white",
          background: "rgba(255, 255, 255, 0.08)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          color: "black",
        },
      });
      dispatch(clearOrderDeleted());

      return;
    }

    dispatch(adminOrdersAction);
  }, [dispatch, error, isOrderDeleted]);

  return (
    <div className="w-full  sm:flex">
      <div className="sm:w-1/5 ">
        <Sidebar />
      </div>

      <div className="sm:w-4/5 ">
        <h2 className="text-center my-5">User Orders</h2>
        <div className="grid grid-cols-1  md:grid-cols-2 p-5">
          {adminOrders &&
            adminOrders.map((order) => (
              <div className="glass text-center p-1 my-2 sm:p-5 sm:m-5" key={order._id}>
                <div className="flex items-center justify-between">
                  <p>Id </p>
                  <p>{order._id}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Number of Items</p>
                  <p>{order.orderItems.length}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Amount</p>
                  <p>{order.totalPrice}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Status</p>
                  <p
                    className={`${
                      order.orderStatus.includes("Processing")
                        ? "text-red-600 "
                        : "text-mygreen"
                    }`}
                  >
                    {order.orderStatus}
                  </p>
                </div>
                <div className="flex my-3 items-center justify-between">
                  <Link className="btn" to={`/admin/order/${order._id}`}>
                    <i className="fa fa-pencil"></i> Edit Order
                  </Link>
                  <button
                    className="btn"
                    onClick={(e) => deleteHandler(e, order._id)}
                  >
                    <i className="fa fa-trash mr-2"></i>
                    Delete Order
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
