import React from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';

import LeftSubmenu from '@renderer/containers/LeftSubmenu';
import {RootState} from '@renderer/types/store';

import './LeftMenu.scss';

const LeftComponentSelector = ({banks, friends, points, validators, wallets}: RootState) => ({
  banks,
  friends,
  points,
  validators,
  wallets,
});

const LeftMenu = () => {
  const {banks, friends, points, validators, wallets} = useSelector(LeftComponentSelector);

  const getAccounts = () => {
    return wallets.map(({name, id}) => (
      <NavLink className="MenuItem" to="/">
        {name} ({id})
      </NavLink>
    ));
  };

  const getFriends = () => {
    return friends.map(({name}) => (
      <NavLink className="MenuItem" to="/">
        {name}
      </NavLink>
    ));
  };

  const getManagedBanks = () => {
    return banks.map(({name, ipAddress}) => (
      <NavLink className="MenuItem" to="/">
        {name} ({ipAddress})
      </NavLink>
    ));
  };

  const getManagedValidators = () => {
    return validators.map(({name, ipAddress}) => (
      <NavLink className="MenuItem" to="/">
        {name} ({ipAddress})
      </NavLink>
    ));
  };

  const renderSampleMenuItems = () => {
    return [...Array(8)].map((_, i) => <h1 key={i}>{i}</h1>);
  };

  return (
    <div className="LeftMenu">
      <div className="LeftMenu__points">
        <div className="points__title section-header">Points</div>
        <div className="points__amount">{points.toLocaleString()}</div>
      </div>
      <LeftSubmenu
        menuItems={[
          <NavLink className="MenuItem" to="/bank">
            Bank ({banks.length})
          </NavLink>,
          <NavLink className="MenuItem" to="/bank">
            Validators ({validators.length})
          </NavLink>,
        ]}
        title="Network"
      />
      <LeftSubmenu menuItems={getManagedBanks()} title="Managed Banks" />
      <LeftSubmenu menuItems={getManagedValidators()} title="Managed Validators" />
      <LeftSubmenu menuItems={getAccounts()} title="Accounts" />
      <LeftSubmenu menuItems={getFriends()} title="Friends" />
      <div className="LeftMenu__links">{renderSampleMenuItems()}</div>
    </div>
  );
};

export default LeftMenu;
