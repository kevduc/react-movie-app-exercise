import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const StarRating = (props) => {
  const STAR_ICONS = [farStar, props.hideEmpty ? faStarHalf : faStarHalfAlt, fasStar];
  return (
    <div className="text-nowrap">
      {new Array(props.maxRating)
        .fill(0)
        .fill(1, 0, Math.floor(props.rating))
        .fill(0.5, Math.floor(props.rating), Math.ceil(props.rating))
        .map((value, index) => (
          <FontAwesomeIcon
            key={index}
            className={`${props.className} ${props.hideEmpty && value === 0 ? "invisible" : "visible"} fa-w-18`}
            icon={STAR_ICONS[2 * value]}
            style={{ color: props.color }}
          />
        ))}
    </div>
  );
};

export default StarRating;
