import React, {FC} from 'react';
import {hot} from 'react-hot-loader/root';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';

import Connect from '@renderer/containers/Connect';
import Layout from '@renderer/containers/Layout';

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Connect />
        </Route>
        <Route>
          <Layout />
        </Route>
      </Switch>
    </Router>
  );
};

export default hot((): JSX.Element => <App />);
