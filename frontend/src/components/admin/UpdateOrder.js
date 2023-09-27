import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  orderDetail as orderDetailAction,
  updateOrder,
} from "../../actions/orderActions";
import { clearOrderUpdated } from "../../slices/orderSlice";
import { clearError } from "../../slices/productSlice";
import toast from "react-hot-toast";

export default function UpdateOrder() {
  const { loading, isOrderUpdated, error, orderDetail } = useSelector(
    (state) => state.orderState
  );
  const {
    user = {},
    orderItems = [],
    shippingInfo = {},
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;
  const isPaid = paymentInfo.status === "succeeded" ? true : false;
  const [orderStatus, setOrderStatus] = useState("Processing");
  const { id: orderId } = useParams();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const orderData = {};
    orderData.orderStatus = orderStatus;
    dispatch(updateOrder(orderId, orderData));
  };

  useEffect(() => {
    if (isOrderUpdated) {
      toast.success(`Order Updated Successfully`, {
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
      dispatch(clearOrderUpdated());

      return;
    }

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

    dispatch(orderDetailAction(orderId));
  }, [isOrderUpdated, error, orderId, dispatch]);

  useEffect(() => {
    if (orderDetail._id) {
      setOrderStatus(orderDetail.orderStatus);
    }
  }, [orderDetail]);

  return (
    <div className="w-full  sm:flex">
      <div className="sm:w-1/5 ">
        <Sidebar />
      </div>

      <div className="sm:w-4/5 glass ">
        <h2 className="text-center my-5">Order Details</h2>
        <div className="grid grid-cols-1  md:grid-cols-2 p-5">
          <div className="md:mx-5">
            <h2>Shipping Info</h2>

            <div className="flex items-center justify-between bg-mywhite p-3 my-3">
              <p>Name</p>
              <p>{user.name}</p>
            </div>
            <div className="flex items-center justify-between bg-mywhite p-3 my-3">
              <p>Phone</p>
              <p>{shippingInfo.phoneNo}</p>
            </div>
            <div className="flex items-center justify-between bg-mywhite p-3 my-3">
              <p>Address</p>
              <p>
                {shippingInfo.address}, {shippingInfo.city},{" "}
                {shippingInfo.postalCode}, {shippingInfo.state},{" "}
                {shippingInfo.country}
              </p>
            </div>
            <div className="flex items-center justify-between bg-mywhite p-3 my-3">
              <p>Amount</p>
              <p>{totalPrice}</p>
            </div>

            <div className="flex items-center justify-end bg-mywhite p-3 my-3">
              <p
                className={`${
                  isPaid ? "text-mygreen" : "text-red-500 "
                } font-semibold`}
              >
                {isPaid ? "PAID" : "NOT PAID"}
              </p>
            </div>
            <div className="flex items-center justify-between bg-mywhite p-3 my-3">
              <p>Order Status</p>

              <p
                className={`${
                  orderStatus && orderStatus.includes("Delivered")
                    ? "text-mygreen"
                    : "text-red-500 "
                } font-semibold`}
              >
                {orderStatus}
              </p>
            </div>

            <div className="flex items-center justify-between bg-mywhite p-3 my-3">
              <select
                className="bg-transparent"
                onChange={(e) => setOrderStatus(e.target.value)}
                value={orderStatus}
                name="status"
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button
                className="btn"
                disabled={loading}
                onClick={submitHandler}
              >
                Update Order Status
              </button>
            </div>
          </div>

          <div className="md:mx-5">
            {/* Product Details */}
            <h2 className="mb-5">Order Items</h2>

            {orderItems &&
              orderItems.map((item) => (
                <div className="glass p-2 flex items-center justify-between m-3">
                  <div>
                    <img
                      className="w-[60px] h-60px]"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div className="">
                    <p>{item.price}</p>
                  </div>

                  <div className="">
                    <p>{item.quantity} Piece(s)</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
