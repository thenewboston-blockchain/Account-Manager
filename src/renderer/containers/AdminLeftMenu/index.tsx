import React from 'react';
import {NavLink} from 'react-router-dom';

import LeftMenu from '@renderer/containers/LeftMenu';

const AdminLeftMenu = () => {
  return (
    <LeftMenu>
      <NavLink to="/bank">Bank</NavLink>
    </LeftMenu>
  );
};

export default AdminLeftMenu;
