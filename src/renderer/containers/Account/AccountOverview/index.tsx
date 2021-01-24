import React, {FC, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {TileAccountBalance, TileAccountNumber, TileSigningKey} from '@renderer/components/Tiles';
import {fetchAccountBalance} from '@renderer/dispatchers/balances';
import {getManagedAccounts, getManagedFriends} from '@renderer/selectors';
import {AccountNumberParams, AccountType, AppDispatch} from '@renderer/types';
import {displayErrorToast} from '@renderer/utils/toast';

import './AccountOverview.scss';

const AccountOverview: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {accountNumber} = useParams<AccountNumberParams>();
  const managedAccounts = useSelector(getManagedAccounts);
  const managedFriends = useSelector(getManagedFriends);
  const managedAccount = managedAccounts[accountNumber];
  const managedFriend = managedFriends[accountNumber];

  const type = useMemo<AccountType | null>(() => {
    let output: AccountType | null = null;

    if (managedAccount) {
      output = AccountType.managedAccount;
    } else if (managedFriend) {
      output = AccountType.managedFriend;
    }

    return output;
  }, [managedAccount, managedFriend]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        await dispatch(fetchAccountBalance(accountNumber));
      } catch (error) {
        displayErrorToast(error);
      }
    };

    fetchData();
  }, [accountNumber, dispatch]);

  return (
    <div className="AccountOverview">
      <TileAccountBalance accountNumber={accountNumber} type={type} />
      <TileAccountNumber accountNumber={accountNumber} type={type} />
      {managedAccount && <TileSigningKey accountNumber={accountNumber} signingKey={managedAccount.signing_key} />}
    </div>
  );
};

export default AccountOverview;
