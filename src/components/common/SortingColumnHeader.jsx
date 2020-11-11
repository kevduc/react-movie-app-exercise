import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown, faSort } from "@fortawesome/free-solid-svg-icons";

const SortingColumnHeader = (props) => {
  const { children, className, sortOrder, onClick } = props;
  const icon = { asc: faSortDown, desc: faSortUp, null: faSort }[sortOrder];
  return (
    <th onClick={onClick} scope="col" className={`${className} text-nowrap pl-3`}>
      {children}
      <FontAwesomeIcon icon={icon} className="ml-1 fa-w-18 text-muted" size="sm" />
    </th>
  );
};

SortingColumnHeader.defaultProps = {
  sortOrder: null,
};

export default SortingColumnHeader;
