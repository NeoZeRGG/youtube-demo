import React from "react";
import { Button } from 'antd';
import "./SavedFav.css";
import { useHistory } from "react-router-dom";

function SavedFav({ req, params, handleReqDelete, setVisiblePopup, setReqParams, handleExecute }) {

  const history = useHistory();

  function handleChangeClick() {
    setReqParams({...req, ...params });
    setVisiblePopup(true);
  }

  function handleExecuteClick() {
    handleExecute(params).finally(() => history.push("/"));
  }

  function handleDeleteClick() {
    handleReqDelete(req);
  }

  return (
    <li className="saved-fav">
      <p className="saved-fav__title">{req.name}</p>
      <div className="saved-fav__buttons">
        <Button type="primary" onClick={handleExecuteClick}>Поиск</Button>
        <Button onClick={handleChangeClick}>Изменить</Button>
        <Button type="primary" danger onClick={handleDeleteClick}>
          Удалить
        </Button>
      </div>
    </li>
  );
}

export default SavedFav;
