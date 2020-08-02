import React, {FC, ReactNode, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import noop from 'lodash/noop';

import {fetchBanks} from '@renderer/api/old/bank';
import Icon, {IconType} from '@renderer/components/Icon';
import LeftSubmenuItem from '@renderer/containers/LeftMenu/LeftSubmenuItem';
import LeftSubmenuItemStatus, {LeftSubmenuItemStatusProps} from '@renderer/containers/LeftMenu/LeftSubmenuItemStatus';
import AddAccountModal from '@renderer/containers/Account/AddAccountModal';
import AddFriendModal from '@renderer/containers/Friend/AddFriendModal';
import useBooleanState from '@renderer/hooks/useBooleanState';
import {Account, getAccount} from '@renderer/store/old/accounts';
import {Friend} from '@renderer/store/old/friends';
import {Validator} from '@renderer/store/old/validators';
import {Bank} from '@renderer/types/entities';
import {RootState} from '@renderer/types/store';

import LeftSubmenu from './LeftSubmenu';

import './LeftMenu.scss';

const LeftMenuSelector = ({
  old: {accounts, banks, friends, points, validators},
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
  const {accounts, banks, friends, points, validators} = useSelector(LeftMenuSelector);
  const [addAccountModalIsOpen, toggleAddAccountModal] = useBooleanState(false);
  const [addFriendModalIsOpen, toggleAddFriendModal] = useBooleanState(false);

  useEffect(() => {
    dispatch(getAccount());
    dispatch(fetchBanks());
  }, [dispatch]);

  const getAccountItems = (): ReactNode[] => {
    return accounts
      .map(({accountNumber, nickname}) => ({
        key: accountNumber,
        label: `${nickname ? `${nickname} - ` : ''}${accountNumber}`,
        to: `/account/${accountNumber}/overview`,
      }))
      .map(({key, label, to}) => <LeftSubmenuItem key={key} label={label} to={to} />);
  };

  const getActiveBankItems = (): ReactNode[] => {
    const sampleData: LeftSubmenuItemStatusProps[] = [
      {
        key: 'active-bank',
        label: 'Your Bank (223.125.111.178)',
        status: 'online',
        to: '/bank/123/overview',
      },
    ];
    return sampleData.map(({key, label, status, to}) => (
      <LeftSubmenuItemStatus key={key} label={label} status={status} to={to} />
    ));
  };

  const getBankItems = (): ReactNode[] => {
    return banks
      .map(({ip_address: ipAddress, node_identifier: nodeIdentifier}) => ({
        key: nodeIdentifier,
        label: ipAddress,
        to: `/bank/${nodeIdentifier}/overview`,
      }))
      .map(({key, label, to}) => <LeftSubmenuItemStatus key={key} label={label} status="offline" to={to} />);
  };

  const getFriendItems = (): ReactNode[] => {
    return friends
      .map(({accountNumber, nickname}) => ({
        key: accountNumber,
        label: `${nickname ? `${nickname} - ` : ''}${accountNumber}`,
        to: `/account/${accountNumber}/overview`,
      }))
      .map(({key, label, to}) => <LeftSubmenuItem key={key} label={label} to={to} />);
  };

  const getNetworkItems = (): ReactNode[] => {
    return [
      {key: 'Banks', label: 'Banks', to: '/bank/123456/overview'},
      {key: 'Validators', label: 'Validators', to: '/validator/987685/overview'},
    ].map(({key, label, to}) => <LeftSubmenuItem key={key} label={label} to={to} />);
  };

  const getValidatorItems = (): ReactNode[] => {
    return validators
      .map(({ip_address: ipAddress, network_identifier: networkIdentifier}) => ({
        key: ipAddress,
        label: ipAddress,
        to: `/validator/${networkIdentifier}/overview`,
      }))
      .map(({key, label, to}) => <LeftSubmenuItemStatus key={key} label={label} status="online" to={to} />);
  };

  return (
    <div className="LeftMenu">
      <div className="points">
        <div className="points__title">Points</div>
        <div className="points__amount">{points.toLocaleString()}</div>
      </div>
      <LeftSubmenu
        leftIcon={<Icon className="LeftMenu__icon" icon={IconType.earth} />}
        menuItems={getNetworkItems()}
        title="Network"
      />
      <LeftSubmenu menuItems={getActiveBankItems()} title="Active Bank" titleOnly />
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
