import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfAlt as halfStar } from "@fortawesome/free-solid-svg-icons";

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  return (
    <div className="container">
      <div className="ratingw">
        <h2>Star Rating</h2>
        <div className="center">
          <fieldset className="rating">
            {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5].map((value) => (
              <div key={value}>
                <input
                  type="radio"
                  id={`star${value}`}
                  name="rating"
                  value={value}
                  checked={rating === value}
                  onChange={() => handleRatingChange(value)}
                />
                <label
                  htmlFor={`star${value}`}
                  className={`full ${
                    rating >= value
                      ? "text-green-500"
                      : rating >= value - 0.5
                      ? "text-green-500"
                      : "text-gray-300"
                  }`}
                >
                  {rating >= value ? (
                    <FontAwesomeIcon icon={solidStar} />
                  ) : rating >= value - 0.5 ? (
                    <FontAwesomeIcon icon={halfStar} />
                  ) : null}
                </label>
              </div>
            ))}
          </fieldset>
        </div>
        <h4 id="rating-value">{rating} out of 5</h4>
      </div>
    </div>
  );
};

export default StarRating;
