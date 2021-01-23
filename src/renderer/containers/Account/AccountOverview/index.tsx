import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {TileAccountBalance, TileAccountNumber, TileSigningKey} from '@renderer/components/Tiles';
import {fetchAccountBalance} from '@renderer/dispatchers/balances';
import {getManagedAccounts} from '@renderer/selectors';
import {AppDispatch} from '@renderer/types';
import {displayErrorToast} from '@renderer/utils/toast';

import './AccountOverview.scss';

const AccountOverview: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {accountNumber} = useParams<{accountNumber: string}>();
  const managedAccounts = useSelector(getManagedAccounts);

  const managedAccount = managedAccounts[accountNumber];
  const type = !managedAccount ? 'default' : 'account';

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
