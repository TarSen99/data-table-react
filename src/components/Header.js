import React from 'react';
import PropTypes from 'prop-types';

import Filter from './Filter';
import CheckedItemsButtons from './CheckedItemsButtons';

const Header = ({onFilterInput, handleSelectedButtonClick, showSelectedButtonIsActive}) => (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__logo">
            phones.ua
          </div>
          <Filter
            onFilterInput={onFilterInput}
          />
          <CheckedItemsButtons
            handleSelectedButtonClick={handleSelectedButtonClick}
            showSelectedButtonIsActive={showSelectedButtonIsActive}
          />
        </div>
      </div>
    </header>
);

Header.propTypes = {
  onFilterInput: PropTypes.func.isRequired,
  handleSelectedButtonClick: PropTypes.func.isRequired,
  showSelectedButtonIsActive: PropTypes.bool.isRequired,
};

export default Header;