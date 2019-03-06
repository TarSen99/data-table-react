const columnConfig = {
  imageUrl: {
    hasImage: true,
  },
  name: {
    title: 'Name', // в таблице колонка будет так называться
    isSortable: true, // Поиск будет проверять эту и последнюю колонки
    isSearchable: true,
  },
  snippet: { // Только для тех ключей которые есть в columnConfig будут колонки в таблице
    title: 'Description',
    isSearchable: true, // В этой колонке тоже будет происходить поиск query
  },
  age: {
    title: 'Age',
    isSortable: true, // по этой колонке можно сортировать
  },
};

export default columnConfig;