import React, { useEffect } from "react";
import CheckOut from "./CheckOut";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { validateShipping } from "./Shipping";
import MetaData from "../layouts/MetaData";

export default function ConfirmOrder() {
  const { shippingInfo, items: cartItems } = useSelector(
    (state) => state.cartState
  );
  const { user } = useSelector((state) => state.authState);
  const navigate = useNavigate();

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 500 ? 0 : 50;
  let taxPrice = Number(0.05 * itemsPrice);
  // let totalPrice = Number(itemsPrice + shippingPrice * taxPrice).toFixed(2);
  taxPrice = Number(taxPrice).toFixed(2);

  let totalPrice = itemsPrice + shippingPrice + Number(taxPrice);

  const processPayment = () => {
    const data = {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
  });

  console.log(totalPrice);

  return (
    <>
      <MetaData title={"Confirm Order"} />

      <CheckOut shipping confirmOrder />
      <div className="sm:mx-5 flex items-center justify-center">
        <div className="md:w-9/12 glass">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="md:mx-5">
              <div className="flex  items-center justify-center">
                <div className="text-sm w-full">
                  <h2 className="text-xl  text-center my-1">Shipping Info</h2>

                  <div className="flex bg-mywhite px-5 my-3 py-3 items-center justify-between">
                    <p>Name</p>
                    <p>{user?.name}</p>
                  </div>
                  <div className="flex bg-mywhite px-5 my-3 py-3 items-center justify-between">
                    <p>Phone</p>
                    <p>{shippingInfo?.phoneNo}</p>
                  </div>
                  <div className="flex bg-mywhite px-5 my-3 py-3 items-center justify-between">
                    <p>Address</p>
                    <p>{shippingInfo?.address}</p>
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <h2 className="text-center ">Your Cart Items</h2>
                {cartItems.map((item) => (
                  <>
                    <div className="flex items-center justify-between glass my-2 sm:m-5 p-2">
                      <div>
                        <img
                          className="w-[60px] h-[60px]"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <div className="flex items-center justify-center">
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </div>
                      <div>
                        <p>
                          {item.quantity} <i className="fa-solid fa-xmark"></i>{" "}
                          ₹{item.price} <i class="fa-solid fa-equals"></i>
                          <b> ₹ {item.quantity * item.price}</b>
                        </p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className="md:mx-5 relative">
              <div className="i">
                <h2 className="text-center my-3">Order Summary</h2>
                <div className="flex bg-mywhite px-5 my-3 py-3 items-center justify-between">
                  <p>Subtotal</p>
                  <p>₹ {itemsPrice}</p>
                </div>
                <div className="flex bg-mywhite px-5 my-3 py-3 items-center justify-between">
                  <p>Shipping</p>
                  <p>₹ {shippingPrice}</p>
                </div>
                <div className="flex bg-mywhite px-5 my-3 py-3 items-center justify-between">
                  <p>Tax</p>
                  <p>₹ {taxPrice}</p>
                </div>
                <div className="flex bg-mylight  px-5 my-3 py-3 items-center justify-between">
                  <p>Total</p>
                  <p>₹ {totalPrice}</p>
                </div>
              </div>
              <div className="flex items-center justify-center  md:absolute md:bottom-0 md:left-0 md:right-0 bg-mydark text-mywhite  px-5 my-3 py-3 ">
                <button onClick={processPayment} className="">
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
