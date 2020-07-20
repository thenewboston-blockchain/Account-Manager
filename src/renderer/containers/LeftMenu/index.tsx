import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';

import {fetchBanks} from '@renderer/api/bank';
import Icon, {IconType} from '@renderer/components/Icon';
import LeftSubmenu from '@renderer/containers/LeftSubmenu';
import AddAccountModal from '@renderer/containers/Account/AddAccountModal';
import useBooleanState from '@renderer/hooks/useBooleanState';
import {getAccount} from '@renderer/store/accounts';
import {RootState} from '@renderer/types/store';

import './LeftMenu.scss';
import AddFriendModal from '@renderer/containers/Friend/AddFriendModal';

const LeftComponentSelector = ({accounts, banks, friends, points, validators}: RootState) => ({
  accounts,
  banks: banks.entities,
  friends,
  points,
  validators,
});

const LeftMenu = () => {
  const dispatch = useDispatch();
  const {accounts, banks, friends, points, validators} = useSelector(LeftComponentSelector);
  const [addAccountModalIsOpen, toggleAddAccountModal] = useBooleanState(false);
  const [addFriendModalIsOpen, toggleAddFriendModal] = useBooleanState(false);

  useEffect(() => {
    dispatch(getAccount());
    dispatch(fetchBanks());
  }, []);

  const renderAccounts = () => {
    return accounts.map(({accountNumber, nickname}) => (
      <NavLink className="MenuItem" key={accountNumber} to="/account">
        {nickname ? `${nickname} - ` : null}
        {accountNumber}
      </NavLink>
    ));
  };

  const renderFriends = () => {
    return friends.map(({id, name}) => (
      <NavLink className="MenuItem" key={id} to="/friend">
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
        <div className="points__amount">
          <Icon size={18} icon={IconType.tnb} />
          {points.toLocaleString()}
        </div>
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
      <LeftSubmenu
        menuItems={renderAccounts()}
        title="Accounts"
        tool={<Icon className="tool__plus-icon" icon={IconType.plus} onClick={toggleAddAccountModal} />}
      />
      <LeftSubmenu
        menuItems={renderFriends()}
        title="Friends"
        tool={<Icon className="tool__plus-icon" icon={IconType.plus} onClick={toggleAddFriendModal} />}
      />
      <LeftSubmenu
        menuItems={renderManagedBanks()}
        title="Managed Banks"
        tool={<Icon className="tool__plus-icon" icon={IconType.plus} />}
      />
      <LeftSubmenu
        menuItems={renderManagedValidators()}
        title="Managed Validators"
        tool={<Icon className="tool__plus-icon" icon={IconType.plus} />}
      />
      {addAccountModalIsOpen && <AddAccountModal close={toggleAddAccountModal} />}
      {addFriendModalIsOpen && <AddFriendModal close={toggleAddFriendModal} />}
    </div>
  );
};

export default LeftMenu;
