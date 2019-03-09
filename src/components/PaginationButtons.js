import React from 'react';
import classNames from 'classnames';
import PropTypes from "prop-types";

const PaginationButtons = ({totalPhonesCount, currentPage, perPage, handleClick}) => {
  const generateButtons = (count) => {
    const buttons = [];

    for(let i = 0; i < count; i++) {
      buttons.push(i);
    }

    return buttons;
  };

  const getButtonsCount = () => {
    return Math.ceil(totalPhonesCount / perPage);
  };

  const handleArrowClick = (value, maxPage) => {
    let newPage = currentPage + value;

    newPage = Math.max(0, newPage);
    newPage = Math.min((maxPage - 1), newPage);

    if(newPage === currentPage) {
      return;
    }

    handleClick(newPage);
  };

  const buttonsCount = getButtonsCount();
  const buttons = generateButtons(buttonsCount);

  const firstItem = Math.min((currentPage * perPage + 1), totalPhonesCount);
  const lastItem = Math.min((currentPage * perPage + perPage), totalPhonesCount);

  return (
    <div className="pagination">
      <div className="container">
        <div className="pagination__block">
          <div className="pagination__text">
            <span className="pagination__current-items">
              {
                `${firstItem} - ${lastItem} `
              }
            </span>
            of
            <span className="pagination__total-items">
              {` ${totalPhonesCount}`}
            </span>
          </div>
          <div className="pagination__buttons">
            <button
              onClick={() => handleArrowClick(-1, buttonsCount)}
              className="pagination__arrow button"
              disabled={currentPage === 0}
            >
              {'<'}
            </button>
            {
              buttons.map((button) => {
                const buttonClassName = classNames('button', {
                  'button-active': button === currentPage
                });

                return (
                  <button
                    key={button}
                    onClick={() => handleClick(button)}
                    className={buttonClassName}
                  >
                    {button + 1}
                  </button>
                );
              })
            }
            <button
              onClick={() => handleArrowClick(1, buttonsCount)}
              className="pagination__arrow button"
              disabled={currentPage === Math.max((buttonsCount - 1), 0)}
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PaginationButtons.propTypes = {
  totalPhonesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default PaginationButtons;