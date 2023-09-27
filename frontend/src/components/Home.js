import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./../actions/productActions";
import Product from "./product/Product";
import Pagination from "react-js-pagination";
import toast from "react-hot-toast";
import Loader from "./layouts/Loader";
import MetaData from "./layouts/MetaData";
import Header from "./layouts/Header";
import StarRating from "./layouts/StarRating";

export default function Home() {
  const dispatch = useDispatch();

  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      toast.error(error, {
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
    dispatch(getProducts(null, null, null, null, currentPage));
  }, [dispatch, currentPage, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <MetaData title={"Home"} />
          <Header />
          <div className="w-full h-auto">
            <h2 className="text-center text-2xl my-5">Our Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:px-3 md:px-28">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>

            {productsCount > 0 && productsCount > resPerPage ? (
              <div className="flex justify-center my-5 text-sm sm:text-base">
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
                  linkClass="page-link px-2 sm:px-3 py-2 rounded-sm glass"
                  itemClassPrev=""
                  itemClassNext=""
                  itemClassFirst=""
                  itemClassLast=""
                />
              </div>
            ) : null}
          </div>
        </>
      )}
    </>
  );
}
