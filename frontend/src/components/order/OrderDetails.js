import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { orderDetail as orderDetailAction } from "../../actions/orderActions";
import Loader from './../layouts/Loader';
import MetaData from './../layouts/MetaData';

export default function OrderDetails() {
  const { orderDetail, loading } = useSelector((state) => state.orderState);
  const {
    shippingInfo = {},
    user = {},
    orderStatus = "Processing",
    orderItems = [],
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;
  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(orderDetailAction(id));
  }, [id, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Order Details"} />

          <div className="text-xs sm:text-base">
            <h2 className="text-center my-5">Order #{orderDetail._id}</h2>

            <div className="sm:m-5  grid grid-cols-1 md:grid-cols-2">
              <div className="sm:m-3">
                <h2>Order Items</h2>
                {orderItems &&
                  orderItems.map((item) => (
                    <div className="flex items-center justify-between my-3 p-1 sm:p-5 glass">
                      <div>
                        <img
                          className="w-[40px] h-[40px] sm:w-[65px] sm:h-[65px]"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <div className="">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div className="">
                        <p>${item.price}</p>
                      </div>

                      <div className="">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="sm:m-3">
                <p>Shipping Info</p>
                <div className="my-5">
                  <div className="flex  bg-mywhite p-3 items-center justify-between">
                    <p>Name</p>
                    <p>{user.name}</p>
                  </div>
                  <div className="flex  bg-mywhite p-3 items-center justify-between">
                    <p>Phone</p>
                    <p>{shippingInfo.phoneNo}</p>
                  </div>
                  <div className="flex  bg-mywhite p-3 items-center justify-between">
                    <p>Address</p>
                    <p>
                      {shippingInfo.address}, {shippingInfo.city},
                      {shippingInfo.postalCode}, {shippingInfo.state},
                      {shippingInfo.country}
                    </p>
                  </div>
                  <div className="flex  bg-mywhite p-3 items-center justify-between">
                    <p>Amount</p>
                    <p>{totalPrice}</p>
                  </div>
                  <div className="flex  bg-mywhite p-3 items-center justify-between">
                    <p>Payment</p>
                    <p className={isPaid ? "text-mydark" : "text-red-600"}>
                      {isPaid ? "PAID" : "NOT PAID"}
                    </p>
                  </div>
                  <div className="flex  bg-mywhite p-3 items-center justify-between">
                    <p>Status</p>
                    <p>{orderStatus}</p>
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
