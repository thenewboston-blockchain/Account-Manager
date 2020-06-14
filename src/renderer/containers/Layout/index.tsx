import React, {FC} from 'react';
import {Route, Switch} from 'react-router-dom';

import LeftMenu from '@renderer/containers/LeftMenu';
import Bank from '@renderer/containers/Bank';
import TopNav from '@renderer/containers/TopNav';
import Validator from '@renderer/containers/Validator';

import './Layout.scss';

export const Layout: FC = () => {
  const renderSampleContent = () => {
    return [...Array(100)].map((_, i) => <h1 key={i}>{i}</h1>);
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
            <span className="material-icons">face</span>
            <div style={{padding: 24}}>{renderSampleContent()}</div>
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
