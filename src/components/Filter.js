import React from 'react';
import PropTypes from "prop-types";

const Filter = ({ onFilterInput }) => (
  <div className="header__input">
    <input
      type="text"
      onChange={onFilterInput}
      placeholder="search..."
    />
  </div>
);

Filter.propTypes = {
  onFilterInput: PropTypes.func.isRequired,
};

export default Filter;