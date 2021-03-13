import React, { useState } from "react";
import { Input } from "antd";
import Videos from "../Videos/Videos";
import Favorites from "../Favorites/Favorites";
import {
  BarsOutlined,
  AppstoreOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import "./SearchWithResults.css";
const { Search } = Input;

function SearchWithResults({
  inputValue,
  setInputValue,
  youtubeSearch,
  data,
  user,
  savedList,
  setSavedList,
}) {
  const [defaultList, setDefaultList] = useState(true);
  const [visiblePopup, setVisiblePopup] = useState(false);

  let reqParams = { q: inputValue };

  const onSearch = (value) => {
    if (value !== "") {
      setInputValue(value);
      youtubeSearch(value);
    } else {
      console.log("Введите запрос!");
    }
  };

  function handleChange({ target: { value } }) {
    setInputValue(value);
  }

  function makeListFlex() {
    setDefaultList(true);
  }

  function makeListGrid() {
    setDefaultList(false);
  }

  function addToStore({ name, q, maxResults = 12, order = "relevance" }) {
    const newRequest = {
      name: name,
      params: {
        q: q,
        maxResults: maxResults,
        order: order,
      },
    };
    if (savedList) {
      const localObject = JSON.stringify([...savedList, newRequest]);
      setSavedList([...savedList, newRequest]);
      localStorage.setItem(user, localObject);
    } else {
      const localObject = JSON.stringify([newRequest]);
      setSavedList([newRequest]);
      localStorage.setItem(user, localObject);
    }
    setVisiblePopup(false);
  }

  return (
    <section className="search-result">
      <h1 className="search-result__title">Поиск видео</h1>
      <Search
        placeholder="Что хотите посмотреть?"
        defaultValue={inputValue}
        enterButton="Поиск"
        size="large"
        onSearch={onSearch}
        onChange={handleChange}
      />
      <div className="search-result__select">
        <button
          className="search-result__add"
          onClick={() => {
            setVisiblePopup(true);
          }}
        >
          <HeartOutlined
            style={{
              fontSize: 16,
              color: "#1890ff",
            }}
          />
        </button>
      </div>
      <div className="search-result__container">
        <div className="search-result__information">
          <p>
            Видео по запросу <span>&laquo;{inputValue}&raquo;</span>
          </p>
        </div>
        <div className="search-result__buttons">
          <button className="search-result__button" onClick={makeListFlex}>
            <BarsOutlined
              style={
                defaultList
                  ? { fontSize: 24, color: "#1390E5" }
                  : { fontSize: 24 }
              }
            />
          </button>
          <button className="search-result__button" onClick={makeListGrid}>
            <AppstoreOutlined
              style={
                !defaultList
                  ? { fontSize: 24, color: "#1390E5" }
                  : { fontSize: 24 }
              }
            />
          </button>
        </div>
      </div>
      <Videos data={data} defaultList={defaultList} />
      <Favorites
        visible={visiblePopup}
        onCreate={addToStore}
        onCancel={() => {
          setVisiblePopup(false);
        }}
        add={true}
        reqParams={reqParams}
      />
    </section>
  );
}

export default SearchWithResults;
