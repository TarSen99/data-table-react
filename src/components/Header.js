import React from 'react';
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

export default Header;