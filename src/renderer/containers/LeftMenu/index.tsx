import React, {FC, ReactNode, useMemo, useEffect, useCallback, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import CreateAccountModal from '@renderer/containers/Account/CreateAccountModal';
import AddBankModal from '@renderer/containers/Bank/AddBankModal';
import AddFriendModal from '@renderer/containers/Friend/AddFriendModal';
import LeftSubmenuItem from '@renderer/containers/LeftMenu/LeftSubmenuItem';
import LeftSubmenuItemStatus from '@renderer/containers/LeftMenu/LeftSubmenuItemStatus';
import AddValidatorModal from '@renderer/containers/Validator/AddValidatorModal';
import {useBooleanState} from '@renderer/hooks';
import {AddressData, AppDispatch, ManagedAccount, ManagedFriend, ManagedNode, RootState} from '@renderer/types';
import {
  getActivePrimaryValidatorConfig,
  getManagedAccounts,
  getManagedBanks,
  getManagedFriends,
  getManagedValidators,
  getPointBalance,
} from '@renderer/selectors';

import {formatPathFromNode, formatAddressFromNode} from '@renderer/utils/address';
import {sortByBooleanKey, sortDictValuesByPreferredKey} from '@renderer/utils/sort';

import {fetchBankConfig} from '@renderer/dispatchers/banks';

import LeftSubmenu from './LeftSubmenu';

import './LeftMenu.scss';

interface OnlineBank {
  bankPath: string;
  isOnline: boolean;
}

const LeftMenuSelector = (state: RootState) => {
  return {
    activePrimaryValidator: getActivePrimaryValidatorConfig(state),
    managedAccounts: getManagedAccounts(state),
    managedBanks: getManagedBanks(state),
    managedFriends: getManagedFriends(state),
    managedValidators: getManagedValidators(state),
    pointBalance: getPointBalance(state),
  };
};

const LeftMenu: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {managedAccounts, managedBanks, managedFriends, managedValidators, pointBalance} = useSelector(
    LeftMenuSelector,
  );
  const [addBankModalIsOpen, toggleAddBankModal] = useBooleanState(false);
  const [addFriendModalIsOpen, toggleAddFriendModal] = useBooleanState(false);
  const [addValidatorModalIsOpen, toggleAddValidatorModal] = useBooleanState(false);
  const [createAccountModalIsOpen, toggleCreateAccountModal] = useBooleanState(false);
  const [onlineBanks, setOnlineBanks] = useState<OnlineBank[]>([]);

  const accountItems = useMemo<ReactNode[]>(
    () =>
      sortDictValuesByPreferredKey<ManagedAccount>(managedAccounts, 'nickname', 'account_number')
        .map(({account_number, nickname}) => ({
          baseUrl: `/account/${account_number}`,
          key: account_number,
          label: nickname || account_number,
          to: `/account/${account_number}/overview`,
        }))
        .map(({baseUrl, key, label, to}) => <LeftSubmenuItem baseUrl={baseUrl} key={key} label={label} to={to} />),
    [managedAccounts],
  );

  const getOnlineBanks = useCallback(async () => {
    const mapIsOnlineManagedBank = async (managedBank: AddressData) => {
      try {
        const bankConfig = await dispatch(fetchBankConfig(formatAddressFromNode(managedBank)));
        return {bankPath: formatPathFromNode(managedBank), isOnline: !bankConfig.error};
      } catch {
        return {bankPath: formatPathFromNode(managedBank), isOnline: false};
      }
    };
    setOnlineBanks(await Promise.all(Object.values(managedBanks).map(mapIsOnlineManagedBank)));
  }, [managedBanks, dispatch]);

  const bankMenuItems = useMemo<ReactNode[]>(
    () =>
      sortDictValuesByPreferredKey<ManagedNode>(managedBanks, 'nickname', 'ip_address')
        .sort(sortByBooleanKey<ManagedNode>('is_default'))
        .map((managedBank) => ({
          baseUrl: `/bank/${formatPathFromNode(managedBank)}`,
          isDefault: managedBank.is_default || false,
          isOnline:
            onlineBanks.find((bank) => bank.bankPath === formatPathFromNode(managedBank) && bank.isOnline) || false,
          key: managedBank.ip_address,
          label: managedBank.nickname || managedBank.ip_address,
          to: `/bank/${formatPathFromNode(managedBank)}/overview`,
        }))
        .map(({baseUrl, isDefault, key, label, to, isOnline}) => (
          <LeftSubmenuItemStatus
            badge={isDefault ? 'active-bank' : null}
            baseUrl={baseUrl}
            key={key}
            label={label}
            status={isOnline ? 'online' : 'offline'}
            to={to}
          />
        )),
    [managedBanks, onlineBanks],
  );

  const friendMenuItems = useMemo<ReactNode[]>(
    () =>
      sortDictValuesByPreferredKey<ManagedFriend>(managedFriends, 'nickname', 'account_number')
        .map(({account_number, nickname}) => ({
          baseUrl: `/friend/${account_number}`,
          key: account_number,
          label: nickname || account_number,
          to: `/friend/${account_number}/overview`,
        }))
        .map(({baseUrl, key, label, to}) => <LeftSubmenuItem baseUrl={baseUrl} key={key} label={label} to={to} />),
    [managedFriends],
  );

  const validatorMenuItems = useMemo<ReactNode[]>(
    () =>
      sortDictValuesByPreferredKey<ManagedNode>(managedValidators, 'nickname', 'ip_address')
        .sort(sortByBooleanKey<ManagedNode>('is_default'))
        .map((managedValidator) => ({
          baseUrl: `/validator/${formatPathFromNode(managedValidator)}`,
          isDefault: managedValidator.is_default || false,
          key: managedValidator.ip_address,
          label: managedValidator.nickname || managedValidator.ip_address,
          to: `/validator/${formatPathFromNode(managedValidator)}/overview`,
        }))
        .map(({baseUrl, isDefault, key, label, to}) => (
          <LeftSubmenuItemStatus
            badge={isDefault ? 'primary-validator' : null}
            baseUrl={baseUrl}
            key={key}
            label={label}
            status="online"
            to={to}
          />
        )),
    [managedValidators],
  );

  useEffect(() => {
    getOnlineBanks();
  }, [getOnlineBanks]);

  return (
    <div className="LeftMenu">
      <div className="points">
        <div className="points__title">Balance</div>
        <div className="points__amount">{pointBalance.toLocaleString()}</div>
      </div>
      <LeftSubmenu menuItems={validatorMenuItems} rightOnClick={toggleAddValidatorModal} title="Validators" />
      <LeftSubmenu menuItems={bankMenuItems} rightOnClick={toggleAddBankModal} title="Banks" />
      <LeftSubmenu menuItems={accountItems} rightOnClick={toggleCreateAccountModal} title="My Accounts" />
      <LeftSubmenu menuItems={friendMenuItems} rightOnClick={toggleAddFriendModal} title="My Friends" />
      {addFriendModalIsOpen && <AddFriendModal close={toggleAddFriendModal} />}
      {addBankModalIsOpen && <AddBankModal close={toggleAddBankModal} />}
      {addValidatorModalIsOpen && <AddValidatorModal close={toggleAddValidatorModal} />}
      {createAccountModalIsOpen && <CreateAccountModal close={toggleCreateAccountModal} />}
    </div>
  );
};

export default LeftMenu;
