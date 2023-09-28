import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createReview, getProduct } from "../../actions/productActions";
import {
  clearError,
  clearProduct,
  clearReviewSubmitted,
} from "../../slices/productSlice";
import ProductReviews from "./ProductReviews";
import { addCartItem } from "./../../actions/cartActions";
import { toast } from "react-hot-toast";
import Loader from "./../layouts/Loader";
import MetaData from "./../layouts/MetaData";

export default function ProductDetail() {
  const {
    loading,
    product = {},
    isReviewSubmitted,
    error,
  } = useSelector((state) => state.productState);

  const { user } = useSelector((state) => state.authState);

  const dispatch = useDispatch();

  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    const count = document.querySelector(".count");
    if (product.stock === 0 || quantity >= product.stock) return;
    // const qty = count.valueAsNumber + 1;
    const qty = quantity + 1;

    setQuantity(qty);
  };
  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (quantity === 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [rating, setRating] = useState(0);
  const [star, setStar] = useState(null);
  const [hov, setHov] = useState(null);

  const [comment, setComment] = useState("");

  const reviewHandler = (e) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("comment", comment);
    formData.append("productId", id);
    dispatch(createReview(formData));
    
  };

  useEffect(() => {
    if (isReviewSubmitted) {
      toast.success(`Review Submitted successfully`, {
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
      dispatch(clearReviewSubmitted());
    }
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
    if (!product._id || isReviewSubmitted) {
      dispatch(getProduct(id));
    }

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id, isReviewSubmitted, error]);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  console.log(product.ratings)

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={product.name} />

          <div className=" mx-3 my-10 ">
            <div className="glass py-5">
              <div className="sm:flex">
                <div className="w-full sm:w-10/12  flex items-center justify-center">
                  {product.images &&
                    product.images.length > 0 &&
                    product.images.map((image) => (
                      <div className="w-10/12 md:w-5/12 h-auto" key={image._id}>
                        <img
                          className="h-auto w-full rounded-md"
                          src={image?.image}
                          alt={product?.name}
                        />
                      </div>
                    ))}
                </div>

                <div className="md:px-28">
                  <div className="my-2 px-5 text-center">
                    <h2 className="text-mydark">{product?.name}</h2>
                    <p className="text-sm text-gray-400 my-2">
                      {product?.description}
                    </p>
                  </div>
                  <div
                    className="my-3 px-5 flex items-center
         justify-between"
                  >
                    <p>Price ₹ {product?.price}</p>
                    <p>Quantity {quantity}</p>
                  </div>
                  <div className="flex items-center justify-between px-5">
                    <div className="flex gap-2">
                      <button className="btn" onClick={decreaseQty}>
                        <i className="fa fa-minus"></i>
                      </button>{" "}
                      <button className="btn" onClick={increaseQty}>
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>

                    <button
                      disabled={product?.stock === 0 ? true : false}
                      onClick={() => {
                        dispatch(addCartItem(product._id, quantity));
                        toast.success(`Flower Added to Cart`, {
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
                      }}
                      className="btn hover:scale-105"
                    >
                      Add to cart
                    </button>
                  </div>

                  <div className="px-5 my-3">
                    <p
                      className={`text-sm ${
                        product.stock > 0 ? "text-mygreen" : "text-red-600"
                      }`}
                    >
                      {product.stock > 0
                        ? "Product Available"
                        : "Product not Available "}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="mx-5">
                      <p>
                        {" "}
                        {product.ratings }
                        <i className="fa-solid fa-star text-yellow-400 px-1"></i>
                        Ratings
                      </p>
                    </div>

                    <div className="mx-5">
                      <p>{product?.numOfReviews} Reviews </p>
                    </div>
                  </div>

                  {user ? (
                    <div onClick={() => setShow(!show)} className="mx-5 my-3">
                      <button className=" border-2 py-2 border-mydark w-full">
                        Make Review
                      </button>
                    </div>
                  ) : (
                    <div className="text-center my-2 mx-5 text-mygreen">
                      <p> Login to Make Review</p>
                    </div>
                  )}

                  <div className={`mx-5 my-3  ${show ? "visible" : "hidden"} `}>
                    <form>
                      <div className="my-2 flex items-center justify-start">
                        {[...Array(5)].map((star, index) => {
                          const curr = index + 1;
                          return (
                            <label className="" key={index}>
                              <input
                                className="hidden"
                                type="radio"
                                value={curr}
                                onClick={() => setRating(curr)}
                                name="rating"
                                required
                              />
                              <span
                                className={`text-2xl cursor-pointer ${
                                  curr <= (hov || rating)
                                    ? "text-yellow-400"
                                    : "text-gray-400"
                                }`}
                                onMouseEnter={() => setHov(curr)}
                                onMouseLeave={() => setHov(null)}
                              >
                                <i className="fa-solid  fa-star"></i>
                              </span>
                            </label>
                          );
                        })}
                      </div>

                      <textarea
                        onChange={(e) => setComment(e.target.value)}
                        required
                        className="px-3 py-1 w-full h-[100px] glass  border-2  border-mydark outline-none "
                      ></textarea>
                      <div className="flex gap-5">
                        <button
                          onClick={reviewHandler}
                          disabled={loading}
                          className=" py-2 rounded-md bg-mydark text-mywhite   w-full"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="mx-5">
                <div className="">
                  {product.reviews && product.reviews.length > 0 ? (
                    <ProductReviews reviews={product.reviews} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
 
