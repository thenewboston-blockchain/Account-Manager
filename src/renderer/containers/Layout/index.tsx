import React, {FC} from 'react';
import {Route, Switch} from 'react-router-dom';

import Account from '@renderer/containers/Account';
import Bank from '@renderer/containers/Bank';
import LeftMenu from '@renderer/containers/LeftMenu';
import TopNav from '@renderer/containers/TopNav';
import Validator from '@renderer/containers/Validator';

import './Layout.scss';
import Friend from '@renderer/containers/Friend';

export const Layout: FC = () => {
  return (
    <div className="Layout">
      <div className="top">
        <TopNav />
      </div>
      <div className="left">
        <LeftMenu />
      </div>
      <div className="right">
        <Switch>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/friend">
            <Friend />
          </Route>
          <Route path="/bank">
            <Bank />
          </Route>
          <Route path="/validator">
            <Validator />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Layout;
