import React from 'react';

const Filter = (props) => (
  <div className="header__input">
    <input
      type="text"
      onChange={props.onFilterInput}
      placeholder="search..."
    />
  </div>
);

export default Filter;