import React from "react";

import TableHeader from "../common/TableHeader";
import TableBody from "../common/TableBody";

const Table = ({ data, columns, sortColumn, onSort, className }) => (
  <table className={`table ${className}`}>
    <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
    <TableBody columns={columns} data={data} />
  </table>
);

export default Table;
