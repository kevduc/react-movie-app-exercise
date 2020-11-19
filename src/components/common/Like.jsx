import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";

const Like = ({ liked, className, colorUnliked, colorLiked, onClick }) => {
  const icon = liked ? fullHeart : emptyHeart;
  const color = liked ? colorLiked : colorUnliked;
  return (
    <button className={`btn no-border ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={icon} style={{ color }} />
    </button>
  );
};

export default Like;
