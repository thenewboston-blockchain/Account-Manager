import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import noop from 'lodash/noop';

import {fetchBanks} from '@renderer/api/bank';
import AddAccountModal from '@renderer/containers/Account/AddAccountModal';
import AddFriendModal from '@renderer/containers/Friend/AddFriendModal';
import useBooleanState from '@renderer/hooks/useBooleanState';
import {Account, getAccount} from '@renderer/store/accounts';
import {Friend} from '@renderer/store/friends';
import {Validator} from '@renderer/store/validators';
import {Bank} from '@renderer/types/entities';
import {RootState} from '@renderer/types/store';

import LeftSubmenu, {LeftSubmenuItem} from './LeftSubmenu';

import './LeftMenu.scss';

const LeftComponentSelector = ({
  accounts,
  banks,
  friends,
  points,
  validators,
}: RootState): {
  accounts: Account[];
  banks: Bank[];
  friends: Friend[];
  points: number;
  validators: Validator[];
} => ({
  accounts,
  banks: banks.entities,
  friends,
  points,
  validators,
});

const LeftMenu: FC = () => {
  const dispatch = useDispatch();
  const {accounts, banks, friends, points, validators} = useSelector(LeftComponentSelector);
  const [addAccountModalIsOpen, toggleAddAccountModal] = useBooleanState(false);
  const [addFriendModalIsOpen, toggleAddFriendModal] = useBooleanState(false);

  useEffect(() => {
    dispatch(getAccount());
    dispatch(fetchBanks());
  }, [dispatch]);

  const getAccountItems = (): LeftSubmenuItem[] => {
    return accounts.map(({accountNumber, nickname}) => ({
      key: accountNumber,
      label: `${nickname ? `${nickname} - ` : ''}${accountNumber}`,
      to: `/account/${accountNumber}/overview`,
    }));
  };

  const getBankItems = (): LeftSubmenuItem[] => {
    return banks.map(({ip_address: ipAddress}) => ({key: ipAddress, label: ipAddress, to: '/'}));
  };

  const getFriendItems = (): LeftSubmenuItem[] => {
    return friends.map(({id, name}) => ({key: id, label: name, to: '/friend'}));
  };

  const getNetworkItems = (): LeftSubmenuItem[] => {
    return [
      {key: 'Banks', label: `Banks (${banks.length})`, to: '/bank/123456/overview'},
      {key: 'Validators', label: `Validators (${validators.length})`, to: '/validator/987685/overview'},
    ];
  };

  const getValidatorItems = (): LeftSubmenuItem[] => {
    return validators.map(({ip_address: ipAddress}) => ({key: ipAddress, label: ipAddress, to: '/'}));
  };

  return (
    <div className="LeftMenu">
      <div className="points">
        <div className="points__title">Points</div>
        <div className="points__amount">{points.toLocaleString()}</div>
      </div>
      <LeftSubmenu menuItems={getNetworkItems()} title="Network" />
      <LeftSubmenu addOnClick={toggleAddAccountModal} menuItems={getAccountItems()} title="Accounts" />
      <LeftSubmenu addOnClick={toggleAddFriendModal} menuItems={getFriendItems()} title="Friends" />
      <LeftSubmenu addOnClick={noop} menuItems={getBankItems()} title="Managed Banks" />
      <LeftSubmenu addOnClick={noop} menuItems={getValidatorItems()} title="Managed Validators" />
      {addAccountModalIsOpen && <AddAccountModal close={toggleAddAccountModal} />}
      {addFriendModalIsOpen && <AddFriendModal close={toggleAddFriendModal} />}
    </div>
  );
};

export default LeftMenu;
