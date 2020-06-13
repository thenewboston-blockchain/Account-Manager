import React from 'react';

import Left from '@renderer/containers/Left';
import Right from '@renderer/containers/Bank';

import './Layout.scss';

const Layout = () => {
  return (
    <div className="Layout">
      <Left />
      <Right />
    </div>
  );
};

export default Layout;
