import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import HighOrderComponent from "../HighOrderComponent";
import Main from "../Main/Main";
import SavedSearch from "../SavedSearch/SavedSearch";
import Signin from "../Login/Login";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [savedList, setSavedList] = useState([]);
  const [videos, setVideos] = useState([]);
  const [totalVideos, setTotalVideos] = useState(null);
  const [searchIsClicked, setSearchIsClicked] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userName = token.slice(0, -3);
      setUser(userName);
      axios
        .get("./users.json")
        .then((res) => {
          for (let i in res.data.users) {
            if (res.data.users[i].name === userName) {
              getStore(userName);
              setLoggedIn(true);
              history.push("/");
              return;
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }, [history]);

  function getStore(user) {
    const store = localStorage.getItem(user);
    const storeObj = JSON.parse(store);
    setSavedList(storeObj);
  }

  function onSignOut() {
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/sign-in">
          <Signin setLoggedIn={setLoggedIn} setUser={setUser} getStore={getStore} />
        </Route>
        <HighOrderComponent
          exact
          path="/"
          loggedIn={loggedIn}
          component={Main}
          onSignOut={onSignOut}
          user={user}
          savedList={savedList}
          setSavedList={setSavedList}
          videos={videos}
          setVideos={setVideos}
          totalVideos={totalVideos}
          setTotalVideos={setTotalVideos}
          searchIsClicked={searchIsClicked}
          setSearchIsClicked={setSearchIsClicked}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <HighOrderComponent
          exact
          path="/saved-videos"
          loggedIn={loggedIn}
          component={SavedSearch}
          onSignOut={onSignOut}
          user={user}
          savedList={savedList}
          setSavedList={setSavedList}
          setVideos={setVideos}
          setTotalVideos={setTotalVideos}
          setSearchIsClicked={setSearchIsClicked}
          setInputValue={setInputValue}
        />
        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
