import React from 'react';
import {hot} from 'react-hot-loader/root';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import API from '@renderer/containers/API';
import APILeftMenu from '@renderer/containers/APILeftMenu';
import AdminLayout from '@renderer/containers/AdminLayout';
import TopNav from '@renderer/containers/TopNav';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <AdminLayout left={<APILeftMenu />} right={<API />} top={<TopNav />} />
        </Route>
        <Route path="/api">
          <AdminLayout left={<APILeftMenu />} right={<API />} top={<TopNav />} />
        </Route>
      </Switch>
    </Router>
  );
};

export default hot((): JSX.Element => <App />);
