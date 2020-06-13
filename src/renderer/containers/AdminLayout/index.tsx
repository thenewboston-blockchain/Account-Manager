import React, {FC} from 'react';
import {Route, Switch} from 'react-router-dom';

import AdminLeftMenu from '@renderer/containers/LeftMenu';
import Bank from '@renderer/containers/Bank';
import TopNav from '@renderer/containers/TopNav';

import './AdminLayout.scss';

export const AdminLayout: FC = (p) => {
  console.log(p);
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
            <h1>home</h1>
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
