import React from "react";

export default function Star() {
  return (
    <div>
      <div className="rating-outer">
        <div className="rating-inner" style={{ width: "40%" }}></div>
      </div>
      <div className="flex my-5 relative z-0">
        {[5, 4, 3, 2, 1].map((star) => {
          return (
            <i className="fa-regular  fa-star">
              <i
                style={{ width: "80%" }}
                className="  z-50  whitespace-nowrap text-yellow-400  fa-solid fa-star"
              ></i>
            </i>
          );
        })}
      </div>
      <i className="fa-solid fa-star"></i>
      hello<i className="fa-regular fa-star"></i>



      <div className="mt-5">


      </div>
    </div>
  );
}

// import React, { useState } from "react";

// export default function Star() {
//   const [rating, setRating] = useState(2.5);
//   const [hov, setHov] = useState(null);

//   return (
//     <div>
      // {[...Array(5)].map((star, index) => {
      //   const curr = index + 1;
      //   return (
      //     <label className="bg-black">
      //       <input
      //         className="hidden"
      //         type="radio"
      //         value={curr}
      //         onClick={() => setRating(curr)}
      //         name="rating"
      //       />
      //       <span

      //         className={`text-4xl cursor-pointer ${
      //           curr <= (hov || rating) ? "text-red-400" : "text-green-400"
      //         }`}
      //         onMouseEnter={() => setHov(curr)}
      //         onMouseLeave={() => setHov(null)}
      //       >
      //         &#9733;
      //       </span>
      //     </label>
      //   );
      // })}
//     </div>
//   );
// }
