import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {TileAccountBalance, TileAccountNumber, TileSigningKey} from '@renderer/components/Tiles';
import {fetchAccountBalance} from '@renderer/dispatchers/balances';
import {getActivePrimaryValidatorConfig, getManagedAccounts} from '@renderer/selectors';
import {AppDispatch} from '@renderer/types';
import {displayErrorToast} from '@renderer/utils/toast';

import './AccountOverview.scss';

const AccountOverview: FC = () => {
  const {accountNumber} = useParams<{accountNumber: string}>();
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const activePrimaryValidator = useSelector(getActivePrimaryValidatorConfig);
  const dispatch = useDispatch<AppDispatch>();
  const managedAccounts = useSelector(getManagedAccounts);
  const managedAccount = managedAccounts[accountNumber];
  const type = !managedAccount ? 'default' : 'account';

  useEffect(() => {
    if (!activePrimaryValidator) return;

    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        const accountBalance = await dispatch(fetchAccountBalance(accountNumber));
        setBalance(accountBalance);
      } catch (error) {
        displayErrorToast(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accountNumber, activePrimaryValidator, dispatch, managedAccount]);

  return (
    <div className="AccountOverview">
      <TileAccountBalance balance={balance} loading={loading} type={type} />
      <TileAccountNumber accountNumber={accountNumber} type={type} />
      {managedAccount && (
        <TileSigningKey accountNumber={accountNumber} loading={loading} signingKey={managedAccount.signing_key} />
      )}
    </div>
  );
};

export default AccountOverview;
