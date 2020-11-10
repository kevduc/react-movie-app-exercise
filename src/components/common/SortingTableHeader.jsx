import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown, faSort } from "@fortawesome/free-solid-svg-icons";

const SortingTableHeader = (props) => {
  const { children, className, sortOrder, onSort } = props;
  const icon = { asc: faSortDown, desc: faSortUp, null: faSort }[sortOrder];
  return (
    <th onClick={() => onSort()} scope="col" className={`${className} text-nowrap pl-2`}>
      {children}
      <FontAwesomeIcon icon={icon} className="ml-1 fa-w-18 text-muted" size="sm" />
    </th>
  );
};

SortingTableHeader.defaultProps = {
  sortOrder: null,
};

export default SortingTableHeader;
