import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "countries-list";
import { saveShippingInfo } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import Checkout from "./CheckOut";
import MetaData from "../layouts/MetaData";

export const validateShipping = (shippingInfo, navigate) => {
  if (
    !shippingInfo.address ||
    !shippingInfo.city ||
    !shippingInfo.state ||
    !shippingInfo.country ||
    !shippingInfo.phoneNo ||
    !shippingInfo.postalCode
  ) {
    // toast.error('Please fill the shipping information',{position: toast.POSITION.BOTTOM_CENTER})
    navigate("/shipping");
  }
};

export default function Shipping() {
  const { shippingInfo = {} } = useSelector((state) => state.cartState);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);
  const countryList = Object.values(countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInfo({ address, city, phoneNo, postalCode, country, state })
    );
    navigate("/order/confirm");
  };

  return (
    <>
      <MetaData title={"Shipping"} />

      <Checkout shipping />
      <div className="flex justify-center text-mydark mt-5">
        <form
          onSubmit={submitHandler}
          className="glass p-5  md:w-4/12 rounded-md"
        >
          <h2 className="text-center my-1">Shipping Info</h2>
          <div>
            <p>Address</p>
            <input
              className=" bg-mywhite my-2 w-full outline-none px-2 py-2"
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <p>City</p>
            <input
              className=" bg-mywhite my-2 w-full outline-none px-2 py-2"
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <p>Phone No</p>
            <input
              className=" bg-mywhite my-2 w-full outline-none px-2 py-2"
              type="number"
              name="phoneNumber"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </div>
          <div>
            <p>Postal Code</p>
            <input
              className=" bg-mywhite my-2 w-full outline-none px-2 py-2"
              type="number"
              name="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div>
            <p>State</p>
            <input
              className=" bg-mywhite my-2 w-full outline-none px-2 py-2"
              type="text"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div>
            <p>Country</p>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="bg-mywhite my-2 w-full outline-none px-2 py-2 "
            >
              {countryList.map((country, i) => (
                <option key={i} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="my-3">
            <button className="btn w-full">Continue</button>
          </div>
        </form>
      </div>
    </>
  );
}
