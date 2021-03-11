import React from "react";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import SearchWithResults from "../SearchWithResults/SearchWithResults";
import youtubeApi from "../../api/youtubeApi";

function Main({
  onSignOut,
  user,
  savedList,
  setSavedList,
  videos,
  setVideos,
  totalVideos,
  setTotalVideos,
  searchIsClicked,
  setSearchIsClicked,
  inputValue,
  setInputValue
}) {

  function clickOnSearch() {
    setSearchIsClicked(true);
  }

  function youtubeSearch(keyword) {
    return youtubeApi
      .get("/search", {
        params: {
          q: keyword,
          maxResults: 12,
        },
      })
      .then((res) => {
        setTotalVideos(res.data.pageInfo.totalResults);
        setVideos(res.data.items);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Header onSignOut={onSignOut} />
      {!searchIsClicked && (
        <SearchForm
          clickOnSearch={clickOnSearch}
          setInputValue={setInputValue}
          youtubeSearch={youtubeSearch}
        />
      )}
      {searchIsClicked && (
        <SearchWithResults
          clickOnSearch={clickOnSearch}
          inputValue={inputValue}
          setInputValue={setInputValue}
          youtubeSearch={youtubeSearch}
          totalVideos={totalVideos}
          data={videos}
          user={user}
          savedList={savedList}
          setSavedList={setSavedList}
        />
      )}
    </>
  );
}

export default Main;
