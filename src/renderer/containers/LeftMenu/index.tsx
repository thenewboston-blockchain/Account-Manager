import React, {FC, ReactNode, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import noop from 'lodash/noop';

import Icon, {IconType} from '@renderer/components/Icon';
import CreateAccountModal from '@renderer/containers/Account/CreateAccountModal';
import AddFriendModal from '@renderer/containers/Friend/AddFriendModal';
import LeftSubmenuItem from '@renderer/containers/LeftMenu/LeftSubmenuItem';
import LeftSubmenuItemStatus from '@renderer/containers/LeftMenu/LeftSubmenuItemStatus';
import {useBooleanState} from '@renderer/hooks';
import {
  getActiveBank,
  getActiveBankConfig,
  getActivePrimaryValidatorConfig,
  getManagedAccounts,
  getManagedBanks,
  getManagedFriends,
  getManagedValidators,
} from '@renderer/selectors';
import {unsetActiveBank, unsetActivePrimaryValidator} from '@renderer/store/app';
import {AppDispatch, ManagedFriend, ManagedNode, RootState} from '@renderer/types';
import {formatPathFromNode} from '@renderer/utils/address';

import LeftSubmenu from './LeftSubmenu';

import './LeftMenu.scss';

const LeftMenuSelector = (state: RootState) => {
  return {
    activeBank: getActiveBankConfig(state),
    activeBankNickname: getActiveBank(state)?.nickname,
    activePrimaryValidator: getActivePrimaryValidatorConfig(state),
    managedAccounts: getManagedAccounts(state),
    managedBanks: getManagedBanks(state),
    managedFriends: getManagedFriends(state),
    managedValidators: getManagedValidators(state),
  };
};

const LeftMenu: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    activeBank,
    activeBankNickname,
    activePrimaryValidator,
    managedAccounts,
    managedBanks,
    managedFriends,
    managedValidators,
  } = useSelector(LeftMenuSelector);
  const [addFriendModalIsOpen, toggleAddFriendModal] = useBooleanState(false);
  const [createAccountModalIsOpen, toggleCreateAccountModal] = useBooleanState(false);

  const accountItems = useMemo<ReactNode[]>(
    () =>
      Object.values(managedAccounts)
        .map(({account_number, nickname}) => ({
          baseUrl: `/account/${account_number}`,
          key: account_number,
          label: nickname || account_number,
          to: `/account/${account_number}/overview`,
        }))
        .map(({baseUrl, key, label, to}) => <LeftSubmenuItem baseUrl={baseUrl} key={key} label={label} to={to} />),
    [managedAccounts],
  );

  const activeBankMenuItem = useMemo<ReactNode>(() => {
    if (!activeBank) return null;
    const baseUrl = `/bank/${formatPathFromNode(activeBank)}`;

    return (
      <LeftSubmenuItemStatus
        baseUrl={baseUrl}
        key="active-bank"
        label={activeBankNickname ? `${activeBankNickname} (${activeBank.ip_address})` : activeBank.ip_address}
        status="online"
        to={`${baseUrl}/overview`}
      />
    );
  }, [activeBank, activeBankNickname]);

  const bankMenuItems = useMemo<ReactNode[]>(
    () =>
      Object.values(managedBanks)
        .map((managedBank: ManagedNode) => ({
          baseUrl: `/bank/${formatPathFromNode(managedBank)}`,
          key: managedBank.ip_address,
          label: managedBank.ip_address,
          to: `/bank/${formatPathFromNode(managedBank)}/overview`,
        }))
        .map(({baseUrl, key, label, to}) => (
          <LeftSubmenuItemStatus baseUrl={baseUrl} key={key} label={label} status="online" to={to} />
        )),
    [managedBanks],
  );

  const friendMenuItems = useMemo<ReactNode[]>(
    () =>
      managedFriends
        .map(({account_number, nickname}: ManagedFriend) => ({
          baseUrl: `/friend/${account_number}`,
          key: account_number,
          label: nickname || account_number,
          to: `/friend/${account_number}/overview`,
        }))
        .map(({baseUrl, key, label, to}) => <LeftSubmenuItem baseUrl={baseUrl} key={key} label={label} to={to} />),
    [managedFriends],
  );

  const handleChangeBank = (): void => {
    dispatch(unsetActivePrimaryValidator());
    dispatch(unsetActiveBank());
  };

  const networkMenuItems = useMemo<ReactNode[]>(() => {
    if (!activePrimaryValidator) return [];
    return [
      {
        baseUrl: `/validator/${formatPathFromNode(activePrimaryValidator)}/banks`,
        key: 'Banks',
        label: 'Banks',
        to: `/validator/${formatPathFromNode(activePrimaryValidator)}/banks`,
      },
      {
        baseUrl: `/validator/${formatPathFromNode(activePrimaryValidator)}/validators`,
        key: 'Validators',
        label: 'Validators',
        to: `/validator/${formatPathFromNode(activePrimaryValidator)}/validators`,
      },
    ].map(({baseUrl, key, label, to}) => <LeftSubmenuItem baseUrl={baseUrl} key={key} label={label} to={to} />);
  }, [activePrimaryValidator]);

  const validatorMenuItems = useMemo<ReactNode[]>(
    () =>
      Object.values(managedValidators)
        .map((managedValidator: ManagedNode) => ({
          baseUrl: `/validator/${formatPathFromNode(managedValidator)}`,
          key: managedValidator.ip_address,
          label: managedValidator.ip_address,
          to: `/validator/${formatPathFromNode(managedValidator)}/overview`,
        }))
        .map(({baseUrl, key, label, to}) => (
          <LeftSubmenuItemStatus baseUrl={baseUrl} key={key} label={label} status="online" to={to} />
        )),
    [managedValidators],
  );

  return (
    <div className="LeftMenu">
      <div className="points">
        <div className="points__title">Points</div>
        <div className="points__amount">12,345.00</div>
      </div>
      <LeftSubmenu
        leftIcon={<Icon className="LeftMenu__icon" icon={IconType.earth} />}
        menuItems={networkMenuItems}
        title="Network"
      />
      <LeftSubmenu
        menuItems={[activeBankMenuItem]}
        noExpandToggle
        rightOnClick={handleChangeBank}
        rightText="Change"
        title="Active Bank"
      />
      <LeftSubmenu menuItems={accountItems} rightOnClick={toggleCreateAccountModal} title="Accounts" />
      <LeftSubmenu menuItems={friendMenuItems} rightOnClick={toggleAddFriendModal} title="Friends" />
      <LeftSubmenu menuItems={bankMenuItems} rightOnClick={noop} title="Managed Banks" />
      <LeftSubmenu menuItems={validatorMenuItems} rightOnClick={noop} title="Managed Validators" />
      {addFriendModalIsOpen && <AddFriendModal close={toggleAddFriendModal} />}
      {createAccountModalIsOpen && <CreateAccountModal close={toggleCreateAccountModal} />}
    </div>
  );
};

export default LeftMenu;
