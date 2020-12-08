import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import {TileAccountBalance, TileAccountNumber, TileSigningKey} from '@renderer/components/Tiles';
import {getActivePrimaryValidatorConfig, getManagedAccounts} from '@renderer/selectors';
import {setManagedAccountBalance} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types';
import {formatAddress} from '@renderer/utils/address';

import './AccountOverview.scss';

const AccountOverview: FC = () => {
  const {accountNumber} = useParams<{accountNumber: string}>();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const activePrimaryValidator = useSelector(getActivePrimaryValidatorConfig);
  const dispatch = useDispatch<AppDispatch>();
  const managedAccounts = useSelector(getManagedAccounts);
  const managedAccount = managedAccounts[accountNumber];
  const type = !managedAccount ? 'default' : 'account';

  useEffect(() => {
    if (!activePrimaryValidator) return;

    const fetchData = async (): Promise<void> => {
      const {ip_address: ipAddress, port, protocol} = activePrimaryValidator;
      const address = formatAddress(ipAddress, port, protocol);

      setLoading(true);
      const {data} = await axios.get(`${address}/accounts/${accountNumber}/balance`);

      if (managedAccount) {
        dispatch(
          setManagedAccountBalance({
            account_number: managedAccount.account_number,
            balance: data.balance || 0,
          }),
        );
      }

      setBalance(data.balance);
      setLoading(false);
    };

    fetchData();
  }, [accountNumber, activePrimaryValidator, dispatch, managedAccount]);

  return (
    <div className="AccountOverview">
      <TileAccountBalance balance={managedAccount?.balance || balance || 0} loading={loading} type={type} />
      <TileAccountNumber accountNumber={accountNumber} type={type} />
      {managedAccount && (
        <TileSigningKey accountNumber={accountNumber} loading={loading} signingKey={managedAccount.signing_key} />
      )}
    </div>
  );
};

export default AccountOverview;
