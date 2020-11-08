import React from "react";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const numPages = Math.ceil(itemsCount / pageSize);

  if (currentPage > numPages) onPageChange(numPages);

  if (numPages === 1) return null;

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li key="Previous" className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            onClick={() => {
              if (currentPage === 1) return;
              onPageChange(currentPage - 1);
            }}
            className="page-link"
            tabIndex="-1">
            Previous
          </button>
        </li>
        {[...Array(numPages).keys()]
          .map((i) => i + 1)
          .map((i) => (
            <li key={i} className={`page-item ${i === currentPage ? "active" : ""}`}>
              <button onClick={() => onPageChange(i)} className="page-link">
                {i}
              </button>
            </li>
          ))}
        <li key="Next" className={`page-item ${currentPage === numPages ? "disabled" : ""}`}>
          <button
            onClick={() => {
              if (currentPage === numPages) return;
              onPageChange(currentPage + 1);
            }}
            className="page-link">
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
