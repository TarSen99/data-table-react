import React from 'react';
import classNames from 'classnames';
import TableContext from './TableContext'

import PaginationSelector from "./PaginationSelector";

const IMAGE_BASE = 'https://raw.githubusercontent.com/TarSen99/DataTableComponent/master/';

const Main = () => (
  <main className="main">
    <div className="container">
      <table className="main__table">
        <Main.Header />
        <Main.Content />
      </table>
    </div>
  </main>
);

Main.Header = () => (
  <TableContext.Consumer>
    {data => {
      const {handleCheckAll, checkedAll, config, handleOrderClick} = data;

      return (
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleCheckAll}
                checked={checkedAll}
              />
              <PaginationSelector />
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
      }
    }
  </TableContext.Consumer>
);

Main.Content = () => (
  <TableContext.Consumer>
    {
      data => {
        const {phones, togglePhoneCheckbox, config } = data;

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
                          title={title}
                          phone={phone}
                        />
                      );

                    return (
                      <Main.Cell
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
      }
    }
  </TableContext.Consumer>
);

Main.EditableBlock = ({phone, title }) => {
  let editableFormValue = phone[title];
  let wasEdit = false;

  const onFieldChange = (event) => {
    editableFormValue = event.target.value;
    wasEdit = true;
  };

  return (
    <TableContext.Consumer>
      {data => {
        const {handleEditableBlockBlur, handleSubmitEditing} = data;

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
      }}
    </TableContext.Consumer>
  )
};

Main.Cell = ({ title, phone, editableBlock }) => {
  return (
    <TableContext.Consumer>
      {
        data => {
          const {config, handleDoubleClick} = data;
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
        }
      }
    </TableContext.Consumer>
  )
};

export default Main;