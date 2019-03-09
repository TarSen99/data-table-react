import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import TableContext from './TableContext';
import WithContext from './WithContext';
import PaginationSelector from "./PaginationSelector";

const WithTableContext = WithContext.bind(null, TableContext);

const IMAGE_BASE = 'https://raw.githubusercontent.com/TarSen99/DataTableComponent/master/';

const Main = () => (
  <main className="main">
    <div className="container">
      <table className="main__table">
        <MainHeaderWithTableContext />
        <MainContentWithTableContext />
      </table>
    </div>
  </main>
);

const PaginationSelectorWithTableContext = WithTableContext(PaginationSelector);

Main.Header = (props) => {
  const {handleCheckAll, checkedAll, config, handleOrderClick} = props;

  return (
    <thead>
      <tr>
        <th>
          <input
            type="checkbox"
            onChange={handleCheckAll}
            checked={checkedAll}
          />
          <PaginationSelectorWithTableContext />
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
};

Main.Header.propTypes = {
  handleCheckAll: PropTypes.func.isRequired,
  checkedAll: PropTypes.bool.isRequired,
  handleOrderClick: PropTypes.func.isRequired,

  config: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string,
      isSortable: PropTypes.bool,
      isSearchable: PropTypes.bool,
      hasImage: PropTypes.bool,
      isEditable: PropTypes.bool,
    })
  ).isRequired,
};

Main.Content = (props) => {
  const {phones, togglePhoneCheckbox, config } = props;

  return (
    <tbody>
    {
      phones.map(phone => {
        return (
          <tr key={phone.id}>
            <th>
              <input
                type="checkbox"
                checked={phone.isChecked}
                onChange={() => togglePhoneCheckbox(phone.id)}
              />
            </th>
            {Object.keys(config).map(title => {
              const editableBlock =
                (
                  <MainEditableBlockWithTableContext
                    title={title}
                    phone={phone}
                  />
                );

              return (
                <MainCellWithTableContext
                  key={title}
                  title={title}
                  phone={phone}
                  editableBlock={editableBlock}
                />
              )
            })}
          </tr>
        );
      })
    }
    </tbody>
  );
};

Main.Content.propTypes = {
  phones: PropTypes.array,
  togglePhoneCheckbox: PropTypes.func.isRequired,

  config: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string,
      isSortable: PropTypes.bool,
      isSearchable: PropTypes.bool,
      hasImage: PropTypes.bool,
      isEditable: PropTypes.bool,
    })
  ),
};

Main.EditableBlock = (props) => {
  const {handleEditableBlockBlur, handleSubmitEditing, phone, title} = props;

  let editableFormValue = phone[title];
  let wasEdit = false;

  const onFieldChange = (event) => {
    editableFormValue = event.target.value;
    wasEdit = true;
  };

  return (
    <div>
      <textarea
        autoFocus
        defaultValue={editableFormValue}
        onChange={onFieldChange}
        onBlur={() => handleEditableBlockBlur(phone.id)}
        onKeyDown={(e) => e.keyCode === 13 ?
          handleSubmitEditing(phone.id, title, editableFormValue, wasEdit) : null}
        className="editable-block__text"
      />
      <button
        className="editable-block__button button"
        onMouseDown={() => handleSubmitEditing(phone.id, title, editableFormValue, wasEdit)}
      >
        OK
      </button>
    </div>
  );
};

Main.EditableBlock.propTypes = {
  handleEditableBlockBlur: PropTypes.func.isRequired,
  handleSubmitEditing: PropTypes.func.isRequired,
  title: PropTypes.string,
  phone: PropTypes.shape({
    age: PropTypes.number,
    editableField: PropTypes.string,
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    isChecked: PropTypes.bool,
    name: PropTypes.string,
    snippet: PropTypes.string,
  }).isRequired,
};

Main.Cell = (props) => {
  const {config, handleDoubleClick, title, phone, editableBlock} = props;
  const className = classNames({
    'editable-block': config[title]['isEditable']
  });

  const imageContent = (
    <img
      src={`${IMAGE_BASE}${phone[title]}`}
      alt={title}
    />
  );

  return (
    <td
      key={title}
      onDoubleClick={config[title]['isEditable']
        ? () => handleDoubleClick(phone.id, title) : null}
      className={className}
    >
      {
        (phone.editableField === title && editableBlock) ||
        (config[title]['hasImage']
          ? imageContent : phone[title])
      }
    </td>
  );
};

Main.Cell.propTypes = {
  handleDoubleClick: PropTypes.func.isRequired,
  handleSubmitEditing: PropTypes.func.isRequired,
  title: PropTypes.string,
  editableBlock: PropTypes.element,

  config: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string,
      isSortable: PropTypes.bool,
      isSearchable: PropTypes.bool,
      hasImage: PropTypes.bool,
      isEditable: PropTypes.bool,
    })
  ).isRequired,

  phone: PropTypes.shape({
    age: PropTypes.number,
    editableField: PropTypes.string,
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    isChecked: PropTypes.bool,
    name: PropTypes.string,
    snippet: PropTypes.string,
  }).isRequired,
};


const MainHeaderWithTableContext = WithTableContext(Main.Header);
const MainContentWithTableContext = WithTableContext(Main.Content);
const MainEditableBlockWithTableContext = WithTableContext(Main.EditableBlock);
const MainCellWithTableContext = WithTableContext(Main.Cell);

export default Main;