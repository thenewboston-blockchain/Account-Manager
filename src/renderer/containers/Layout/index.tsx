import React, {FC} from 'react';
import {Route, Switch} from 'react-router-dom';

import LeftMenu from '@renderer/containers/LeftMenu';
import Bank from '@renderer/containers/Bank';
import TopNav from '@renderer/containers/TopNav';
import Validator from '@renderer/containers/Validator';

import './Layout.scss';

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
