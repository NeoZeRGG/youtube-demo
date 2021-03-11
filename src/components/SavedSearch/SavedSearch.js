import React, { useState } from "react";
import Header from "../Header/Header";
import SavedFav from "../SavedFav/SavedFav";
import Favorites from "../Favorites/Favorites";
import youtubeApi from "../../api/youtubeApi";
import "./SavedSearch.css";

function SavedSearch({ onSignOut, user, savedList, setSavedList, setVideos, setTotalVideos, setSearchIsClicked, setInputValue }) {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [reqParams, setReqParams] = useState(null)

  function handleReqDelete(req) {
    const newList = savedList.filter((savedreq) => savedreq.name !== req.name);
    const localNewList = JSON.stringify(newList);
    setSavedList(newList);
    localStorage.setItem(user, localNewList);
  }

  function changeInStore(values) {
    const updatedReq = savedList.find((r) => r.name === reqParams.name);
    if (updatedReq) {
      updatedReq.name = values.name;
      updatedReq.params.q = values.q;
      updatedReq.params.maxResults = values.maxResults;
      updatedReq.params.order = values.order;
      setSavedList([...savedList]);
      const localObject = JSON.stringify([...savedList]);
      localStorage.setItem(user, localObject);
    }
    setVisiblePopup(false);
  }

  function handleExecute(params) {
    return youtubeApi
      .get("/search", {
        params: {params},
      })
      .then((res) => {
        setTotalVideos(res.data.pageInfo.totalResults);
        setVideos(res.data.items);
        setInputValue(params.q);
        setSearchIsClicked(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Header onSignOut={onSignOut} />
      <section className="saved__container">
        <h2 className="saved__title">Избранное</h2>
        {savedList && (
          <ul className="saved__search">
            {savedList.map((savedReq, index) => (
              <SavedFav
                key={index}
                params={savedReq.params}
                req={savedReq}
                handleExecute={handleExecute}
                handleReqDelete={handleReqDelete}
                setVisiblePopup={setVisiblePopup}
                setReqParams={setReqParams}
              />
            ))}
          </ul>
        )}
      </section>
      <Favorites
        visible={visiblePopup}
        onCancel={() => {
          setVisiblePopup(false);
        }}
        reqParams={reqParams}
        onCreate={changeInStore}
      />
    </>
  );
}

export default SavedSearch;
