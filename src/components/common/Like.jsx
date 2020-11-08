import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";

const Like = (props) => {
  return (
    <button className={`btn no-border ${props.className ? props.className : ""}`} onClick={props.onClick}>
      {props.liked ? (
        <FontAwesomeIcon icon={fasHeart} style={{ color: props.colorLiked }} />
      ) : (
        <FontAwesomeIcon icon={farHeart} style={{ color: props.color }} />
      )}
    </button>
  );
};

export default Like;
