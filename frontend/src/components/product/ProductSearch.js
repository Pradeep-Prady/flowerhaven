import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../actions/productActions";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import "rc-slider/assets/index.css";
import Product from "./Product";
import Pagination from "react-js-pagination";
import toast from "react-hot-toast";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";

export default function ProductSearch() {
  const dispatch = useDispatch();

  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );

  const [openFilter, setOpenFilter] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([1, 1000]);
  const [priceChanged, setPriceChanged] = useState(price);

  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);

  const { keyword } = useParams();

  const categories = [
    "Alstroemeria",
    "Carnations",
    "Casa Blanca Lilies",
    "Chrysanthemums",
    "Daffodils",
    "Daisies",
    "Gerbera Daisies",
    "Gladiolus",
    "Hydrangeas",
    "Iris",
    "Lilies",
    "Orchids",
    "Peonies",
    "Rose",
    "Sunflowers",
    "Tulips",
  ];

  const setCurrentPageNo = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
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
    dispatch(getProducts(keyword, priceChanged, category, rating, currentPage));
  }, [dispatch, currentPage, error, keyword, priceChanged, category, rating]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Products"} />

          <div className="flex sm:hidden items-center justify-end p-3">
            <button
              onClick={() => setOpenFilter(!openFilter)}
              className="bg-mydark cursor-pointer px-3 py-1 rounded-md text-mywhite"
            >
              {openFilter ? "Close Filter" : "Open Filter"}
            </button>
          </div>
          <div className="w-full h-auto sm:flex">
            {/* <h2 className="text-center text-2xl my-5">Search Products</h2> */}

            {/* <div className={`w-full relative z-50 visible ${openFilter ? "visible" :"hidden"}  sm:w-4/12  sm:visible md:w-2/12 px-5 border-r-2 bg-mydark`}> */}

            {/* Filter Options */}
            <div
              className={`w-full relative z-50 hidden sm:block sm:w-4/12 md:w-2/12 px-5 border-r-2 bg-mydark`}
            >
              {/* Price Filter */}
              <div
                className="pt-10 px-2"
                onMouseUp={() => setPriceChanged(price)}
              >
                <h3 className="mb-3 text-mylight">Price</h3>

                <Slider
                  className="text-mylight"
                  range={true}
                  marks={{ 1: "₹ 1", 1000: "₹ 1000" }}
                  min={1}
                  max={1000}
                  defaultValue={price}
                  onChange={(price) => setPrice(price)}
                  handleRender={(renderProps) => {
                    return (
                      <Tooltip
                        overlay={`₹${renderProps.props["aria-valuenow"]}`}
                      >
                        <div
                          className="bg-mywhite    "
                          {...renderProps.props}
                        ></div>
                      </Tooltip>
                    );
                  }}
                />
              </div>
              {/* Category Filter */}
              <div className="pt-10">
                <h3 className="my-3 text-mylight">Categories</h3>
                <ul>
                  {categories.map((category) => (
                    <li
                      className="text-sm my-2 cursor-pointer text-mywhite hover:text-mylight"
                      key={category}
                      onClick={() => {
                        setCategory(category);
                      }}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Rating Filter */}
              <div className="py-5">
                <ul>
                  <h3 className="mb-3 text-mylight">Ratings</h3>

                  {[5, 4, 3, 2, 1].map((star) => (
                    <li
                      className="cursor-pointer text-2xl flex items-center space-x-1"
                      key={star}
                      onClick={() => {
                        setRating(star);
                      }}
                    >
                      {[5, 4, 3, 2, 1].map((index) => (
                        <span
                          key={index}
                          className={` ${
                            index > star ? "text-gray-100" : "text-yellow-400"
                          }`}
                        >
                          &#9733;
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Mobile Filter */}
            <div
              className={`w-full relative z-50 ${
                openFilter ? "block" : "hidden"
              } sm:hidden sm:w-4/12 md:w-2/12 px-5 border-r-2 bg-mydark`}
            >
              {/* Price Filter */}
              <div
                className="pt-10 px-2"
                onMouseUp={() => setPriceChanged(price)}
              >
                <h3 className="mb-3 text-mylight">Price</h3>

                <Slider
                  className="text-mylight"
                  range={true}
                  marks={{ 1: "$1", 1000: "$1000" }}
                  min={1}
                  max={1000}
                  defaultValue={price}
                  onChange={(price) => setPrice(price)}
                  handleRender={(renderProps) => {
                    return (
                      <Tooltip
                        overlay={`$${renderProps.props["aria-valuenow"]}`}
                      >
                        <div
                          className="bg-mygreen "
                          {...renderProps.props}
                        ></div>
                      </Tooltip>
                    );
                  }}
                />
              </div>
              {/* Category Filter */}
              <div className="pt-10">
                <h3 className="my-3 text-mylight">Categories</h3>
                <ul>
                  {categories.map((category) => (
                    <li
                      className="text-sm my-2 cursor-pointer text-mywhite hover:text-mylight"
                      key={category}
                      onClick={() => {
                        setCategory(category);
                      }}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Rating Filter */}
              <div className="py-5">
                <ul>
                  <h3 className="mb-3 text-mylight">Ratings</h3>

                  {[5, 4, 3, 2, 1].map((star) => (
                    <li
                      className="cursor-pointer text-2xl flex items-center space-x-1"
                      key={star}
                      onClick={() => {
                        setRating(star);
                      }}
                    >
                      {[5, 4, 3, 2, 1].map((index) => (
                        <span
                          key={index}
                          className={`text-yellow-400 ${
                            index > star ? "text-gray-100" : ""
                          }`}
                        >
                          &#9733;
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="sm:w-8/12 md:w-10/12">
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3">
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                    // <h2>Hi</h2>
                  ))}
              </div>

              {productsCount > 0 && productsCount > resPerPage ? (
                <div className="flex justify-center my-5">
                  <Pagination
                    className="pagination"
                    activePage={currentPage}
                    onChange={setCurrentPageNo}
                    totalItemsCount={productsCount}
                    itemsCountPerPage={resPerPage}
                    nextPageText={"Next"}
                    firstPageText={"First"}
                    lastPageText={"Last"}
                    itemClass="page-item"
                    linkClass="page-link px-3 py-2 rounded-sm glass"
                    itemClassPrev=""
                    itemClassNext=""
                    itemClassFirst=""
                    itemClassLast=""
                  />
                </div>
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
}
