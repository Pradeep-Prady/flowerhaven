import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  decreaseCartItemQty,
  increaseCartItemQty,
  removeItemFromCart,
} from "../../slices/cartSlice";
import toast from "react-hot-toast";
import Loader from "./../layouts/Loader";
import MetaData from "./../layouts/MetaData";

export default function Cart() {
  const { items, loading } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const increaseQty = (item) => {
    const count = item.quantity;
    if (item.stock === 0 || count >= item.stock) return;
    dispatch(increaseCartItemQty(item.product));
  };
  const decreaseQty = (item) => {
    const count = item.quantity;
    if (count === 1) return;
    dispatch(decreaseCartItemQty(item.product));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Cart"} />

          <div className="grid grid-cols-1 md:grid-cols-2">
            {items.length === 0 ? (
              <h2 className="text-2xl my-10 text-center">Your Cart is Empty</h2>
            ) : (
              <div>
                <div className="text-center w-full">
                  <h1 className="text-2xl my-4">Your Cart</h1>
                </div>

                {items.map((item) => (
                  <div className="glass text-sm sm:text-base m-3 flex items-center justify-between">
                    <div>
                      <img
                        className="h-[80px] w-[80px]"
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <div>
                      <p>{item.name}</p>
                      <p>{item.price}</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="btn" onClick={() => decreaseQty(item)}>
                        <i className="fa fa-minus"></i>
                      </button>{" "}
                      <div className="flex items-center justify-center">
                        <p>{item.quantity}</p>
                      </div>{" "}
                      <button className="btn" onClick={() => increaseQty(item)}>
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn"
                        onClick={() => {
                          dispatch(removeItemFromCart(item.product));
                          toast.success(`Flower Removed from Cart`, {
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
                        }}
                      >
                        <i className="fa fa-trash text-red-600"></i>
                      </button>{" "}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div>
              <div className="flex justify-center">
                <div className="w-6/12">
                  <div className="text-mydark">
                    <h4 className="text-xl my-3">Order Summary</h4>
                    <hr />
                    <div>
                      <div className="my-4">
                        <p className="my-2">
                          Subtotal:{" "}
                          <span className="text-md">
                            {items.reduce(
                              (acc, item) => acc + item.quantity,
                              0
                            )}{" "}
                            items
                          </span>
                        </p>
                        <p>
                          Est. total:{" "}
                          <span className="">
                            ${" "}
                            {items.reduce(
                              (acc, item) => acc + item.quantity * item.price,
                              0
                            )}
                          </span>
                        </p>
                      </div>
                      <hr />
                      <button
                        id="checkout_btn"
                        onClick={checkoutHandler}
                        className="text-center btn w-full my-5 text-black"
                      >
                        Check out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
