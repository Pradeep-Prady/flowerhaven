import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, getReviews } from "./../../actions/productActions";
import { clearError } from "../../slices/authSlice";
import { clearReviewDeleted } from "../../slices/productSlice";
import Sidebar from "./Sidebar";
import toast from "react-hot-toast";

export default function Reviews() {
  const {
    reviews = [],
    loading = true,
    error,
    isReviewDeleted,
  } = useSelector((state) => state.productState);
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteReview(productId, id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getReviews(productId));
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
      dispatch(clearError());
      return;
    }
    if (isReviewDeleted) {
      toast.success( `Review Deleted Successfully `, {
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
      dispatch(clearReviewDeleted());

      dispatch(getReviews(productId));
      return;
    }
  }, [dispatch, error, productId, isReviewDeleted]);

  return (
    <div className="w-full  sm:flex">
      <div className="sm:w-1/5 ">
        <Sidebar />
      </div>

      <div className="sm:w-4/5 m-5 ">
        <h2 className="text-center my-5">Product reviews</h2>
        <div className="">
          <form className="" onSubmit={submitHandler}>
            <input
              type="text"
              onChange={(e) => setProductId(e.target.value)}
              value={productId}
              className="w-full bg-mywhite outline-none py-3 px-2 sm:w-4/6"
            />
            <button
              type="submit"
              disabled={loading}
              className=" bg-mydark py-3 text-mywhite h-full w-full sm:w-2/6"
            >
              Search
            </button>
          </form>
          <div className="grid grid-cols-1  md:grid-cols-2 p-5">
            {reviews &&
              reviews.map((review) => (
                <div
                  className="glass text-center p-1 my-2 sm:p-5 sm:m-5"
                  key={review._id}
                >
                  <div className="flex items-center justify-between">
                    <p>Id </p>
                    <p>{review._id}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Rating</p>
                    <p>{review.rating}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>User</p>
                    <p>{review.user.name}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Comment</p>
                    <p>{review.comment}</p>
                  </div>
                  <div className="flex my-3 items-center justify-between">
                    <button
                      className="btn"
                      onClick={(e) => deleteHandler(e, review._id)}
                    >
                      <i className="fa fa-trash mr-2"></i>
                      Delete Review
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
