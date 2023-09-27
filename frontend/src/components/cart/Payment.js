import React, { useEffect } from "react";
import CheckOut from "./CheckOut";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateShipping } from "./Shipping";
import { clearError as clearOrderError } from "../../slices/orderSlice";
import axios from "axios";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { orderCompleted } from "../../slices/cartSlice";
import { createOrder } from "./../../actions/orderActions";
import { toast } from "react-hot-toast";
import MetaData from "../layouts/MetaData";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { user } = useSelector((state) => state.authState);
  const { items: cartItems, shippingInfo } = useSelector(
    (state) => state.cartState
  );
  const { error: orderError } = useSelector((state) => state.orderState);

  const paymentData = {
    amount: Math.round((orderInfo && orderInfo.totalPrice) * 100),
    shipping: {
      name: user.name,
      address: {
        city: shippingInfo.city,
        postal_code: shippingInfo.postalCode,
        country: shippingInfo.country,
        state: shippingInfo.state,
        line1: shippingInfo.address,
      },
      phone: shippingInfo.phoneNo,
    },
  };

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  useEffect(() => {
    validateShipping(shippingInfo, navigate);
    if (orderError) {
      dispatch(clearOrderError());

      return;
    }
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    document.querySelector("#payment_btn").disabled = true;

    try {
      const { data } = await axios.post("/api/v1/payment/process", paymentData);
      const clientSecret = data.client_secret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message, {
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

        document.querySelector("#pay_btn").disabled = false;
      } else {
        if ((await result).paymentIntent.status === "succeeded") {
          toast.success("Payment Success!", {
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

          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(orderCompleted());
          dispatch(createOrder(order));

          navigate("/order/success");
        } else {
          toast.error(`Please Try again!`, {
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
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <MetaData title={"Payment"} />

      <CheckOut shipping confirmOrder payment />

      <div className="flex text-mydark items-center justify-center">
        <form
          className=" rounded-md p-5  glass md:w-4/12"
          onSubmit={handlePayment}
        >
          <h2 className="text-center text-xl">Card Details</h2>
          <div>
            <p>Card Number</p>
            <CardNumberElement className="w-full my-2 rounded-sm bg-mylight px-2 py-3" />
          </div>
          <div>
            <p>Card Expiry</p>
            <CardExpiryElement className="w-full my-2 rounded-sm bg-mylight px-2 py-3" />
          </div>
          <div>
            <p>Card Expiry</p>
            <CardCvcElement className="w-full my-2 rounded-sm bg-mylight px-2 py-3" />
          </div>
          <div>
            <button id="payment_btn" type="submit" className="btn w-full my-5">
              Make Payment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
