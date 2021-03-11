import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../vendor/images/sibdev-logo.jpg";

function Header({ onSignOut }) {
  const [current, setCurrent] = useState('');
  const page = useLocation();

  useEffect(() => {
    if (page.pathname === '/') {
      setCurrent('search')
    }
  }, [page.pathname])

  function handleClick(e) {
    setCurrent(e.key);
  }

  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="логотип" className="header__logo"></img>
        <Menu
          onClick={handleClick}
          selectedKeys={current}
          mode="horizontal"
          style={{ border: "none" }}
        >
          <Menu.Item key="search">
            <NavLink exact to="/">
              Поиск
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/saved-videos">
            <NavLink exact to="/saved-videos">
              Избранное
            </NavLink>
          </Menu.Item>
        </Menu>
      </div>
      <div>
        <button className="header__button" onClick={onSignOut}>Выйти</button>
      </div>
    </header>
  );
}

export default Header;
