import React from 'react';
import PropTypes from 'prop-types';


const PaginationSelector = (props) => {
  const {handlePaginationSelector, perPage} = props;

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
  )
};

PaginationSelector.propTypes = {
  handlePaginationSelector: PropTypes.func.isRequired,
  perPage: PropTypes.number.isRequired,
};

export default PaginationSelector;