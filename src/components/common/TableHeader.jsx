import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown, faSort } from "@fortawesome/free-solid-svg-icons";

class TableHeader extends Component {
  sortBy = (property) => {
    const sortColumn = { ...this.props.sortColumn };
    if (property === sortColumn.property) {
      sortColumn.order = { asc: "desc", desc: "asc" }[sortColumn.order];
    } else {
      sortColumn.property = property;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  render() {
    const { columns, sortColumn } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(({ name, property }) => {
            const icon =
              property !== sortColumn.property ? faSort : { asc: faSortDown, desc: faSortUp, null: faSort }[sortColumn.order];
            return (
              <th key={name} onClick={() => this.sortBy(property)} scope="col" className={`text-nowrap pl-3`}>
                {name}
                <FontAwesomeIcon icon={icon} className="ml-1 fa-w-18 text-muted" size="sm" />
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

TableHeader.defaultProps = {
  sortColumn: { property: null, order: null },
};

export default TableHeader;
