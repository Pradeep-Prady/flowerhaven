import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userOrders as userOrdersAction } from "../../actions/orderActions";
import { Link } from "react-router-dom";
import MetaData from "./../layouts/MetaData";
import Loader from "../layouts/Loader";

export default function UserOrders() {
  const { userOrders = [], loading } = useSelector((state) => state.orderState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userOrdersAction);
  }, [dispatch]);

  console.log(userOrders);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Orders"} />

          <div className="flex items-center justify-center">
            <div className="glass w-full md:w-8/12 m-5">
              <h2 className="text-center my-3 text-xl">My Orders</h2>

              {userOrders &&
                userOrders.length > 0 &&
                userOrders?.map((order) => (
                  <div
                    className="glass m-2 p-5 sm:flex items-center justify-between text-sm"
                    key={order._id}
                  >
                    <div className="">
                      <p className="my-1">Order ID</p>
                      <p>{order._id}</p>
                    </div>
                    <div className="">
                      <p className="my-1">Ordered Items</p>

                      <p>{order.orderItems.length}</p>
                    </div>
                    <div>
                      <p className="my-1">Total Price</p>

                      <p>{order.totalPrice}</p>
                    </div>

                    <div>
                      <p
                        className={`${
                          order.orderStatus.includes("Delivered")
                            ? "text-mygreen"
                            : "text-red-600"
                        }`}
                      >
                        {order.orderStatus}
                      </p>
                    </div>
                    <div>
                      <Link to={`/order/${order._id}`}>
                        <i className="fa fa-eye"></i>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
