import React from "react";

export default function ProductReviews({ reviews }) {
  return (
    <>
      <h2 className="text-mydark text-center  my-3">Reviews</h2>

      <div className="grid grid-cols-1  items-center justify-center py-5">
        {reviews &&
          reviews?.map((review) => (
            <div className="w-full flex items-center justify-center">
              <div
                className="glass w-full h-auto my-2 sm:w-9/12 md:w-6/12 p-2"
                key={review._id}
              >
                <div className="my-3 flex items-center justify-between">
                  <div>
                    {[...Array(5)].map((star, index) => {
                      const curr = index + 1;
                      return (
                        <label key={index} className="">
                          <input
                            className="hidden"
                            type="radio"
                            name="rating"
                          />
                          <span
                            className={`${
                              curr <= review?.rating
                                ? "text-yellow-400"
                                : "text-gray-400"
                            }`}
                          >
                            <i className="fa-solid  fa-star"></i>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  <p className="text-sm text-gray-400 ">{review?.user?.name}</p>
                </div>

                <p>{review?.comment}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
