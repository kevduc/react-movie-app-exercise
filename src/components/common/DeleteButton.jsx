import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const DeleteButton = (props) => {
  return (
    <button onClick={props.onClick} type="button" className={`btn btn-danger ${props.className}`}>
      <FontAwesomeIcon icon={faTimes} />
    </button>
  );
};

export default DeleteButton;
