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
                perPage,
                handleDoubleClick,
                handleSubmitEditing,
                handleEditableBlockBlur
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
          handleDoubleClick={handleDoubleClick}
          handleSubmitEditing={handleSubmitEditing}
          handleEditableBlockBlur={handleEditableBlockBlur}
        />
      </table>
    </div>
  </main>
);

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

Main.Content = ({ phones, config, togglePhoneCheckbox,  handleDoubleClick, handleSubmitEditing, handleEditableBlockBlur}) => {
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
                    <Main.EditableBlock
                      handleEditableBlockBlur={handleEditableBlockBlur}
                      handleSubmitEditing={handleSubmitEditing}
                      title={title}
                      phone={phone}
                    />
                );

                return (
                  <Main.Cell
                    key={title}
                    config={config}
                    title={title}
                    handleDoubleClick={handleDoubleClick}
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

Main.EditableBlock = ({
                        handleEditableBlockBlur,
                        phone,
                        handleSubmitEditing,
                        title
}) => {
  let editableFormValue = phone[title];
  let wasEdit = false;

  const onFieldChange = (event) => {
    editableFormValue = event.target.value;
    wasEdit = true;
  };

  return (
    <div>
      <textarea
        className="editable-block__text"
        defaultValue={editableFormValue}
        onChange={onFieldChange}
        onBlur={() => handleEditableBlockBlur(phone.id)}
        autoFocus
        onKeyDown={(e) => e.keyCode === 13 ?
          handleSubmitEditing(phone.id, title, editableFormValue, wasEdit) : null}
      />
      <button
        className="editable-block__button button"
        onMouseDown={() => handleSubmitEditing(phone.id, title, editableFormValue, wasEdit)}
      >
        OK
      </button>
    </div>
  )
};

Main.Cell = ({ config, title, handleDoubleClick, phone, editableBlock }) => (
  <td
    key={title}
    onDoubleClick={config[title]['isEditable']
      ? () => handleDoubleClick(phone.id, title) : null}
    className={
      classNames({
        'editable-block': config[title]['isEditable']
      })
    }
  >
    {
      (phone.editableField === title &&
        editableBlock) ||
      (config[title]['hasImage']
        ? <img
          src={`${IMAGE_BASE}${phone[title]}`}
          alt={title}
        />
        : phone[title])
    }
  </td>
);

export default Main;