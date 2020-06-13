import React from 'react';
import {hot} from 'react-hot-loader/root';
import {HashRouter as Router} from 'react-router-dom';

import Layout from '@renderer/containers/Layout';

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default hot((): JSX.Element => <App />);
