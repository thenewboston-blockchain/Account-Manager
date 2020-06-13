import React, {FC} from 'react';
import {Route, Switch} from 'react-router-dom';

import LeftMenu from '@renderer/containers/LeftMenu';
import Bank from '@renderer/containers/Bank';
import TopNav from '@renderer/containers/TopNav';

import './Layout.scss';

export const Layout: FC = () => {
  const renderSampleContent = () => {
    return [...Array(100)].map((_, i) => <h1>{i}</h1>);
  };

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
          <Route exact path="/">
            <div style={{padding: 24}}>{renderSampleContent()}</div>
          </Route>
          <Route path="/bank">
            <Bank />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Layout;
