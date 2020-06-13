import React, {FC} from 'react';
import {Route, Switch} from 'react-router-dom';

import AdminLeftMenu from '@renderer/containers/LeftMenu';
import Bank from '@renderer/containers/Bank';
import TopNav from '@renderer/containers/TopNav';

import './AdminLayout.scss';

export const AdminLayout: FC = () => {
  const renderSampleContent = () => {
    return [...Array(100)].map((_, i) => <h1>{i}</h1>);
  };

  return (
    <div className="AdminLayout">
      <div className="top">
        <TopNav />
      </div>
      <div className="left">
        <AdminLeftMenu />
      </div>
      <div className="right">
        <Switch>
          <Route exact path="/">
            {renderSampleContent()}
          </Route>
          <Route path="/bank">
            <Bank />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default AdminLayout;
