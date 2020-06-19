import React from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';

import Icon from '@renderer/components/Icon';
import LeftSubmenu from '@renderer/containers/LeftSubmenu';
import {RootState} from '@renderer/types/store';

import './LeftMenu.scss';

const LeftComponentSelector = ({accounts, banks, friends, points, validators}: RootState) => ({
  accounts,
  banks,
  friends,
  points,
  validators,
});

const LeftMenu = () => {
  const {accounts, banks, friends, points, validators} = useSelector(LeftComponentSelector);

  const renderAccounts = () => {
    return accounts.map(({account_number}) => (
      <NavLink className="MenuItem" key={account_number} to="/account">
        {account_number}
      </NavLink>
    ));
  };

  const renderFriends = () => {
    return friends.map(({id, name}) => (
      <NavLink className="MenuItem" key={id} to="/">
        {name}
      </NavLink>
    ));
  };

  const renderManagedBanks = () => {
    return banks.map(({ip_address}) => (
      <NavLink className="MenuItem" key={ip_address} to="/">
        {ip_address}
      </NavLink>
    ));
  };

  const renderManagedValidators = () => {
    return validators.map(({ip_address}) => (
      <NavLink className="MenuItem" key={ip_address} to="/">
        {ip_address}
      </NavLink>
    ));
  };

  return (
    <div className="LeftMenu">
      <div className="LeftMenu__points">
        <div className="submenu-title">Points</div>
        <div className="points__amount">{points.toLocaleString()}</div>
      </div>
      <LeftSubmenu
        menuItems={[
          <NavLink className="MenuItem" key="Banks" to="/bank">
            Banks ({banks.length})
          </NavLink>,
          <NavLink className="MenuItem" key="Validators" to="/validator">
            Validators ({validators.length})
          </NavLink>,
        ]}
        title="Network"
      />
      <LeftSubmenu menuItems={renderManagedBanks()} title="Managed Banks" tool={<Icon icon="add" />} />
      <LeftSubmenu menuItems={renderManagedValidators()} title="Managed Validators" tool={<Icon icon="add" />} />
      <LeftSubmenu menuItems={renderAccounts()} title="Accounts" tool={<Icon icon="add" />} />
      <LeftSubmenu menuItems={renderFriends()} title="Friends" tool={<Icon icon="add" />} />
    </div>
  );
};

export default LeftMenu;
