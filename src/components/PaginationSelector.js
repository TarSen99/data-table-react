import React from 'react';

const PaginationSelector = ({ handlePaginationSelector, perPage }) => {
  return (
    <div className="pagination__selector">
        <select
          onChange={handlePaginationSelector}
          value={perPage}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
    </div>
  );
};

export default PaginationSelector;