import React, { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

export default function Navbar() {
  const [nav, setNav] = useState(false);

  const setNavOpenFun = (value) => {
    setNav(value);
  };

  return (
    <>
      <div className="w-full  h-auto px-5 sm:px-16 md:px-24 py-5 bg-mydark flex items-center justify-between">
        <div>
          <Link to="/" className="text-xl text-mywhite cursor-pointer">
            Flower Haven
          </Link>
        </div>
        <div className="hidden gap-10 md:flex">
          <Search />
          <div className="flex items-center justify-center">
            <Link to="/profile" className="text-mywhite cursor-pointer">
              Account <i className="fa-regular fa-user"></i>
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <Link to="/cart" className="  text-mywhite cursor-pointer">
              Cart <i className="fa-solid fa-basket-shopping"></i>
            </Link>
          </div>
        </div>

        <div className="md:hidden gap-10 flex">
          <button
            onClick={() => setNav(!nav)}
            className="text-xl outline-none border-none text-mywhite cursor-pointer"
          >
            {nav ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-bars-staggered"></i>
            )}
          </button>
        </div>
      </div>

      {nav ? (
        <div className="absolute z-50 transition-all duration-1000 text-sm w-full text-center md:hidden bg-mydark">
          <div className="py-5">
            <Search setNavOpen={setNavOpenFun} />
          </div>
          <div className="flex items-center justify-center my-3">
            <Link
              to="/profile"
              onClick={() => setNav(false)}
              className=" py-2 w-4/5 sm:w-3/5 border-2 text-mywhite cursor-pointer"
            >
              <i className="fa-regular fa-user"></i> Account
            </Link>
          </div>
          <div className="flex items-center justify-center my-3">
            <Link
              to={`/cart`}
              onClick={() => setNav(false)}
              className="py-2 border-2 w-4/5 sm:w-3/5 text-mywhite cursor-pointer"
            >
              <i className="fa-solid fa-basket-shopping"></i> Cart
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
