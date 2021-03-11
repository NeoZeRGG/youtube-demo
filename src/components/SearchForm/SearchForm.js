import React from "react";
import { Input } from "antd";
import "./SearchForm.css";
const { Search } = Input;

function SearchForm({ setInputValue, youtubeSearch, clickOnSearch }) {
  const onSearch = (value) => {
    if (value !== "") {
      setInputValue(value);
      youtubeSearch(value).finally(() => clickOnSearch())
    }
    else {
      console.log('Введите запрос!')
    }
  };

  return (
    <div className="search">
      <h1 className="search__title">Поиск видео</h1>
      <Search
        placeholder="Что хотите посмотреть?"
        enterButton="Поиск"
        size="large"
        onSearch={onSearch}
      />
    </div>
  );
}

export default SearchForm;
