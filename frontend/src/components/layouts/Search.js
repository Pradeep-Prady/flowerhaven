import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Search({ setNavOpenFun }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`);
    setNavOpenFun(false);
  };
  const clearKeyword = () => {
    setKeyword("");
  };

  useEffect(() => {
    if (location.pathname === "/") {
      clearKeyword();
    }
  }, [location]);

  return (
    <div>
      <form
        onSubmit={searchHandler}
        className="flex items-center justify-center"
      >
        <div className="rounded-lg overflow-hidden w-4/5 sm:w-3/5 md:w-[300px] flex items-center justify-center bg-mywhite">
          <input
            className="w-11/12 bg-transparent focus:bg-transparent border-none outline-none px-2 py-2"
            type="search"
            placeholder="Explore Florals"
            name="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit">
            <i
              className="fa fa-search    border-none outline-none px-2 py-3"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </form>
    </div>
  );
}
