import React from 'react';

import {NavLink} from 'react-router-dom';

import './TopNav.scss';

const TopNav = () => {
  return (
    <div className="TopNav">
      <NavLink className="thenewboston" to="/">
        <img alt="thenewboston logo" className="logo" src={require('@renderer/assets/logo.png')} />
        <span>thenewboston</span>
      </NavLink>
      <NavLink exact to="/">
        Home
      </NavLink>
    </div>
  );
};

export default TopNav;
