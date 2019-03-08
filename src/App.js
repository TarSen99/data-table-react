import React, {Component} from 'react';
import Header from './components/Header';
import Main from './components/Main';
import PaginationButtons from './components/PaginationButtons';
import columnConfig from './components/config';
import TableContext from './components/TableContext';
import './App.css';

class App extends Component {
  state = {
    phones: [],
    order: 'DESC',
    orderBy: '',
    filterValue: '',
    currentPage: 0,
    perPage: 3,
    showSelected: false,
    isLoading: true,
  };

  componentDidMount() {
    fetch('https://mate-academy.github.io/phone-catalogue-static/phones/phones.json')
      .then(response => response.json())
      .then(data => {
        const dataWithCheckbox = this.addIsCheckedProperty(data);
        const dataWithEditableField = this.addCurrentEditableField(dataWithCheckbox);

        this.setState({
          phones: dataWithEditableField,
          isLoading: false,
        })
      });
  }

  addIsCheckedProperty(items) {
    return items.map(item => (
      {
        ...item,
        isChecked: false,
      }
    ));
  }

  addCurrentEditableField(items) {
    return items.map(item => (
      {
        ...item,
        editableField: null,
      }
    ));
  }

  togglePhoneCheckbox = (id) => {
    const phones = [...this.state.phones];
    const phoneIndex = phones.findIndex(phone => phone.id === id);

    phones[phoneIndex] = {
      ...phones[phoneIndex],
      isChecked: !phones[phoneIndex].isChecked,
    };

    this.setState({
      phones,
    });
  };

  onOrderInput = (orderBy) => {
    const newOrder = this.state.orderBy === orderBy
      ? this.getNewOrder() : this.state.order;

    this.setState({
      order: newOrder,
      orderBy: orderBy,
    });
  };

  getNewOrder() {
    return this.state.order === 'ASC' ? 'DESC' : 'ASC';
  }

  sortItems(phones, orderBy, order) {
    return phones.sort((itemA, itemB) => {
      if (order === 'ASC') {
        return itemA[orderBy] > itemB[orderBy] ? 1 : -1
      }

      return itemA[orderBy] > itemB[orderBy] ? -1 : 1
    });
  }

  onFilterInput = (event) => {
    const filterValue = event.target.value;

    this.setState({
      currentPage: 0,
      filterValue,
    });
  };

  getSearchableParams(config) {
    const searchableParams = [];

    for(let param in config) {
      if(!config.hasOwnProperty(param)) {
        return;
      }

      if(columnConfig[param]['isSearchable']) {
        searchableParams.push(param);
      }
    }

    return searchableParams;
  }

  getFilteredPhones() {
    const {phones, filterValue, orderBy, order} = this.state;
    const filterValueLower = filterValue.toLowerCase();
    const searchableParams = this.getSearchableParams(columnConfig);

    const filteredPhones = phones.filter(phone => {
      for(let searchableParam of searchableParams) {
        if(phone[searchableParam].toLowerCase().includes(filterValueLower)) {
          return true;
        }
      }

      return false;
    });

    const filteredBySelection = this.filterBySelection(filteredPhones);
    const orderedPhones = this.sortItems(filteredBySelection, orderBy, order);

    return orderedPhones;
  }

  filterBySelection(phones) {
    if(this.state.showSelected === false) {
      return phones;
    }

    return phones.filter(phone => {
      return phone.isChecked === this.state.showSelected;
    });
  }

  getCurrentPagePhones(phones) {
    const {currentPage, perPage} = this.state;

    return phones.filter((phone, index) => {
      return index >= currentPage * perPage && index < currentPage * perPage + perPage
    });
  }

  selectPage = (page) => {
    this.setState({
      currentPage: page,
    })
  };

  handlePaginationSelector = (event) => {
    const perPage = +event.target.value;

    this.setState({
      currentPage: 0,
      perPage
    })
  };

  handleSelectedButtonClick = (value) => {
    this.setState({
      currentPage: 0,
      showSelected: value,
    });
  };

  handleCheckAll = (event) => {
    const value = event.target.checked;

    const filteredPhones = this.getFilteredPhones();
    const currentPagePhones = [...this.getCurrentPagePhones(filteredPhones)];

    const newPhones = currentPagePhones.map(phone => {
      return {
        ...phone,
        isChecked: value,
      }
    });

    this.setState(state => {
      const phones = [...state.phones];
      newPhones.forEach(({ id, isChecked }) => {
        const index = phones.findIndex(searchedPhone => searchedPhone.id === id);

        phones[index] = {
          ...phones[index],
          isChecked,
        }
      });

      return {
        phones,
      }
    });
  };

  checkAllButtonsSelection(phones) {
    return phones.every(phone => phone.isChecked === true);
  }

  handleDoubleClick = (id, title) => {
    this.setState(state => {
      const phones = [...state.phones];
      const itemIndex = phones.findIndex( phone => phone.id === id);

      phones[itemIndex] = {
        ...phones[itemIndex],
        editableField: title,
      };

      return {
        phones,
      }
    });
  };

  handleSubmitEditing = (id, title, value, wasEdit) => {
    this.setState(state => {
      const phones = [...state.phones];
      const itemIndex = phones.findIndex( phone => phone.id === id);

      phones[itemIndex] = {
        ...phones[itemIndex],
        [title]: wasEdit ? value : phones[itemIndex][title],
        editableField: null,
      };

      return {
        phones,
      }
    });
  };

  handleEditableBlockBlur = (id) => {
    this.setState(state => {
      const phones = [...state.phones];
      const itemIndex = phones.findIndex( phone => phone.id === id);

      phones[itemIndex] = {
        ...phones[itemIndex],
        editableField: null,
      };

      return {
        phones,
      }
    });
  };

  getSettings(phones, allChecked) {
    return {
      perPage: this.state.perPage,
      handlePaginationSelector: this.handlePaginationSelector,
      config: columnConfig,
      phones: phones,
      togglePhoneCheckbox: this.togglePhoneCheckbox,
      handleOrderClick: this.onOrderInput,
      handleCheckAll: this.handleCheckAll,
      checkedAll: allChecked,
      handleDoubleClick: this.handleDoubleClick,
      handleSubmitEditing: this.handleSubmitEditing,
      handleEditableBlockBlur: this.handleEditableBlockBlur,
    };
  }

  render() {
    const phones = this.getFilteredPhones();
    const currentPagePhones = this.getCurrentPagePhones(phones);
    const allChecked = this.checkAllButtonsSelection(currentPagePhones);

    const settings = this.getSettings(currentPagePhones, allChecked);

    return (
      <TableContext.Provider value={settings}>
        <React.Fragment>
          <Header
            onFilterInput={this.onFilterInput}
            handleSelectedButtonClick={this.handleSelectedButtonClick}
            showSelectedButtonIsActive={this.state.showSelected}
          />
          {
            this.state.isLoading ? (
              <div className="container">Loading...</div>
              )
              : <>
                  <Main />
                  <PaginationButtons
                    totalPhonesCount={phones.length}
                    currentPage={this.state.currentPage}
                    perPage={this.state.perPage}
                    handleClick={this.selectPage}
                  />
              </>
          }
        </React.Fragment>
      </TableContext.Provider>
    );
  }
}

export default App;
