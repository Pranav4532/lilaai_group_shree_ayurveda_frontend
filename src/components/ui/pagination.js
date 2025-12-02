import React from "react";
import { Pagination as BSPagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * Pagination Component (React + Bootstrap)
 *
 * Props:
 * - totalPages: number (required)
 * - currentPage: number (required)
 * - onPageChange: (pageNumber) => void (required)
 * - showFirstLast: boolean (optional)
 * - className: string (optional)
 */

export function Pagination({
  totalPages = 1,
  currentPage = 1,
  onPageChange,
  showFirstLast = true,
  className = "",
}) {
  if (totalPages <= 1) return null;

  const handleClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageItems = () => {
    const items = [];
    const maxVisible = 5; // number of visible pages before using ellipsis
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      end = Math.min(totalPages, maxVisible);
    } else if (currentPage >= totalPages - 2) {
      start = Math.max(1, totalPages - 4);
    }

    // show first page + ellipsis
    if (start > 1) {
      items.push(
        <BSPagination.Item key={1} onClick={() => handleClick(1)}>
          1
        </BSPagination.Item>
      );
      if (start > 2) {
        items.push(<BSPagination.Ellipsis key="start-ellipsis" disabled />);
      }
    }

    // visible page range
    for (let page = start; page <= end; page++) {
      items.push(
        <BSPagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => handleClick(page)}
        >
          {page}
        </BSPagination.Item>
      );
    }

    // show ellipsis + last page
    if (end < totalPages) {
      if (end < totalPages - 1) {
        items.push(<BSPagination.Ellipsis key="end-ellipsis" disabled />);
      }
      items.push(
        <BSPagination.Item key={totalPages} onClick={() => handleClick(totalPages)}>
          {totalPages}
        </BSPagination.Item>
      );
    }

    return items;
  };

  return (
    <div className={`d-flex justify-content-center mt-3 ${className}`}>
      <BSPagination>
        {showFirstLast && (
          <BSPagination.First onClick={() => handleClick(1)} disabled={currentPage === 1} />
        )}
        <BSPagination.Prev
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {renderPageItems()}

        <BSPagination.Next
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        {showFirstLast && (
          <BSPagination.Last
            onClick={() => handleClick(totalPages)}
            disabled={currentPage === totalPages}
          />
        )}
      </BSPagination>
    </div>
  );
}
