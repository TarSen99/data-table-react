import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

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

CheckedItemsButtons.propTypes = {
  handleSelectedButtonClick: PropTypes.func.isRequired,
  showSelectedButtonIsActive: PropTypes.bool.isRequired,
};

export default CheckedItemsButtons;