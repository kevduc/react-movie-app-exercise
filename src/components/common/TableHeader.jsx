import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown, faSort } from "@fortawesome/free-solid-svg-icons";

class TableHeader extends Component {
  sortBy = (propertyPath) => {
    const sortColumn = { ...this.props.sortColumn };
    if (propertyPath === sortColumn.propertyPath) {
      sortColumn.order = { asc: "desc", desc: "asc" }[sortColumn.order];
    } else {
      sortColumn.propertyPath = propertyPath;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  getIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.propertyPath !== sortColumn.propertyPath) return faSort;
    else return { asc: faSortDown, desc: faSortUp, null: faSort }[sortColumn.order];
  };

  renderSortIcon = (column) => {
    if (!column.propertyPath) return null;
    else return <FontAwesomeIcon icon={this.getIcon(column)} className="ml-1 fa-w-18 text-muted" size="sm" />;
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((column) => {
            const { key, propertyPath, label } = column;
            const isSortable = !!propertyPath;
            return (
              <th
                key={propertyPath || key}
                onClick={isSortable ? () => this.sortBy(propertyPath) : () => {}}
                scope="col"
                className={`text-nowrap pl-3`}
                role={isSortable ? "button" : ""}>
                {label}
                {this.renderSortIcon(column)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

TableHeader.defaultProps = {
  sortColumn: { propertyPath: null, order: null },
};

export default TableHeader;
