import React, { useState } from "react";

export default function Navbar() {
  const [nav, setNav] = useState(false);

  return (
    <>
      <div className="w-full h-auto px-5 sm:px-16 md:px-24 py-5 bg-mydark flex items-center justify-between">
        <div>
          <h2 className="text-xl text-mywhite cursor-pointer">Flower Haven</h2>
        </div>
        <div className="hidden gap-10 md:flex">
          <div className="">
            <input
              className="w-[300px] rounded-lg border-none outline-none px-2 py-2"
              type="search"
              placeholder="Explore Florals"
            />
          </div>
          <div className="flex items-center justify-center">
            <h2 className="text-xl  text-mywhite cursor-pointer">
              Account <i className="fa-regular fa-user"></i>
            </h2>
          </div>

          <div className="flex items-center justify-center">
            <h2 className="text-xl text-mywhite cursor-pointer">
              Cart <i className="fa-solid fa-basket-shopping"></i>
            </h2>
          </div>
        </div>

        <div className="md:hidden gap-10 flex">
          <button
            onClick={(e) => setNav(!nav)}
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
        <div className="absolute transition-all duration-1000 text-sm w-full text-center md:hidden bg-mydark">
          <div className="py-5">
            <input
              className="w-4/5 sm:w-3/5  rounded-lg border-none outline-none px-2 py-2"
              type="search"
              placeholder="Explore Florals"
            />
          </div>
          <div className="flex items-center justify-center my-3">
            <h2 className=" py-2 w-4/5 sm:w-3/5 border-2 text-mywhite cursor-pointer">
              <i className="fa-regular fa-user"></i> Account
            </h2>
          </div>
          <div className="flex items-center justify-center my-3">
            <h2 className="py-2 border-2 w-4/5 sm:w-3/5 text-mywhite cursor-pointer">
              <i className="fa-solid fa-basket-shopping"></i> Cart
            </h2>
          </div>
        </div>
      ) : null}
    </>
  );
}
