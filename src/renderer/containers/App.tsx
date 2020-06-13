import React from 'react';
import {hot} from 'react-hot-loader/root';
import {HashRouter as Router} from 'react-router-dom';

import AdminLayout from '@renderer/containers/AdminLayout';

const App = () => {
  return (
    <Router>
      <AdminLayout />
    </Router>
  );
};

export default hot((): JSX.Element => <App />);
