import React, {FC} from 'react';
import {Route, Switch} from 'react-router-dom';

import Account from '@renderer/containers/Account';
import Bank from '@renderer/containers/Bank';
import Friend from '@renderer/containers/Friend';
import LeftMenu from '@renderer/containers/LeftMenu';
import TopNav from '@renderer/containers/TopNav';
import Validator from '@renderer/containers/Validator';

import './Layout.scss';

export const Layout: FC = () => {
  return (
    <div className="Layout">
      <div className="Layout__top">
        <TopNav />
      </div>
      <div className="Layout__left">
        <LeftMenu />
      </div>
      <div className="Layout__right">
        <Switch>
          <Route path="/account/:accountNumber">
            <Account />
          </Route>
          <Route path="/banks/:protocol/:ipAddress/:port">
            <Bank />
          </Route>
          <Route path="/friend">
            <Friend />
          </Route>
          <Route path="/validator/:nid">
            <Validator />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Layout;
