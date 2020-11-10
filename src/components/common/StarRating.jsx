import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { faStarHalf as halfStarNoBorder } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfAlt as halfStarBorder } from "@fortawesome/free-solid-svg-icons";

const StarRating = (props) => {
  const { rating, maxRating, hideEmptyStars, className, color } = props;

  const fullStarCount = Math.floor(rating);
  const halfStar = hideEmptyStars ? halfStarNoBorder : halfStarBorder;

  const hasHalf = rating % 1 !== 0;

  const stars = new Array(maxRating).fill(emptyStar).fill(fullStar, 0, fullStarCount);

  if (hasHalf) stars[fullStarCount] = halfStar;

  return (
    <div className="text-nowrap">
      {stars.map((star, index) => (
        <FontAwesomeIcon
          key={index}
          className={`${className} ${hideEmptyStars && star === emptyStar ? "invisible" : "visible"} fa-w-18`}
          icon={star}
          style={{ color }}
        />
      ))}
    </div>
  );
};

export default StarRating;
