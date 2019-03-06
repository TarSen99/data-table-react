import React from 'react';
import classNames from 'classnames';

const CheckedItemsButtons = ({ handleSelectedButtonClick, showSelectedButtonIsActive }) => (
  <div className="header__buttons">
    <button
      className={classNames('button', {
        'button-active': showSelectedButtonIsActive === false
      })}
      onClick={() => handleSelectedButtonClick(false)}
    >
      Show all
    </button>
    <button
      className={classNames('button', {
        'button-active': showSelectedButtonIsActive === true
      })}
      onClick={() => handleSelectedButtonClick(true)}
    >
      Show selected
    </button>
  </div>
);

export default CheckedItemsButtons;