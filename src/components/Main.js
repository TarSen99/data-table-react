import React from 'react';
import classNames from 'classnames';

import PaginationSelector from "./PaginationSelector";

const IMAGE_BASE = 'https://raw.githubusercontent.com/TarSen99/DataTableComponent/master/';

const Main = ({
                checkedAll,
                handleCheckAll,
                phones,
                handleOrderClick,
                togglePhoneCheckbox,
                config,
                handlePaginationSelector,
                perPage
}) => (
  <main className="main">
    <div className="container">
      <table className="main__table">
        <Main.Header
          checkedAll={checkedAll}
          handlePaginationSelector={handlePaginationSelector}
          config={config}
          handleOrderClick={handleOrderClick}
          perPage={perPage}
          handleCheckAll={handleCheckAll}
        />
        <Main.Content
          config={config}
          phones={phones}
          togglePhoneCheckbox={togglePhoneCheckbox}
        />
      </table>
    </div>
  </main>
);

Main.Content = (props) => {
  return (
    <tbody>
      {
        props.phones.map(phone => {
          return (
            <tr key={phone.id}>
              <th>
                <input
                  type="checkbox"
                  checked={phone.isChecked}
                  onChange={() => props.togglePhoneCheckbox(phone.id)}
                />
              </th>
              {Object.keys(props.config).map(title => (
                <td key={title}>
                  {props.config[title]['hasImage']
                    ? <img src={`${IMAGE_BASE}${phone[title]}`} alt="" />
                    : phone[title]}
                </td>
              ))}
            </tr>
          );
        })
      }
    </tbody>
  );
};

Main.Header = ({checkedAll, handlePaginationSelector, config, handleOrderClick, perPage, handleCheckAll}) => (
  <thead>
    <tr>
      <th>
        <input
          type="checkbox"
          onChange={handleCheckAll}
          checked={checkedAll}
        />
        <PaginationSelector
          handlePaginationSelector={handlePaginationSelector}
          perPage={perPage}
        />
      </th>
      {
        Object.entries(config).map(([key, value]) => {
          const sortableTitleClassName = classNames({
            'main__table-sortable': value['isSortable']
          });

          return (
            <th
              key={key}
              className={sortableTitleClassName}
              onClick={value['isSortable'] ? () => handleOrderClick(key) : null }
            >
              {value['title']}
            </th>
          );
        })
      }
    </tr>
  </thead>
);

export default Main;