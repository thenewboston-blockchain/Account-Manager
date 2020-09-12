import React, {FC, ReactNode, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import DetailPanel from '@renderer/components/DetailPanel';
import OverviewBalance from '@renderer/components/OverviewBalance';
import Qr from '@renderer/components/Qr';
import {useBooleanState} from '@renderer/hooks';
import {getActivePrimaryValidatorConfig, getManagedAccounts} from '@renderer/selectors';
import {setManagedAccountBalance} from '@renderer/store/app';
import {AppDispatch} from '@renderer/types';
import {formatAddress} from '@renderer/utils/address';

import './AccountOverview.scss';

const AccountOverview: FC = () => {
  const {accountNumber} = useParams();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [signingKeyVisible, toggleSigningKeyVisible, , setSigningKeyVisibleFalse] = useBooleanState(false);
  const activePrimaryValidator = useSelector(getActivePrimaryValidatorConfig);
  const dispatch = useDispatch<AppDispatch>();
  const managedAccounts = useSelector(getManagedAccounts);
  const managedAccount = managedAccounts[accountNumber];

  useEffect(() => {
    setSigningKeyVisibleFalse();
  }, [accountNumber, setSigningKeyVisibleFalse]);

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

  const getItems = () => {
    const items = [
      {
        key: 'Balance',
        value: <OverviewBalance balance={balance} loading={loading} managedAccountBalance={managedAccount?.balance} />,
      },
      {
        key: 'Account Number',
        value: renderAccountNumber(),
      },
    ];

    if (managedAccount) {
      items.push({
        key: 'Signing Key',
        value: renderSigningKey(),
      });
    }

    return items;
  };

  const renderAccountNumber = (): ReactNode => (
    <>
      <div>{loading ? '-' : accountNumber}</div>
      <Qr className="AccountOverview__qr" text={accountNumber} width={120} />
    </>
  );

  const renderSigningKey = () => {
    if (!managedAccount) return null;
    return (
      <>
        {renderSigningKeyDisplay()}
        {renderSigningKeyToggle()}
      </>
    );
  };

  const renderSigningKeyDisplay = () => {
    const {signing_key: signingKey} = managedAccount;
    return <div>{signingKeyVisible ? signingKey : '*'.repeat(64)}</div>;
  };

  const renderSigningKeyToggle = () => {
    const toggleText = signingKeyVisible ? 'Hide' : 'Show';
    return (
      <div className="AccountOverview__signing-key-toggle" onClick={toggleSigningKeyVisible}>
        {toggleText}
      </div>
    );
  };

  return (
    <div className="AccountOverview">
      <DetailPanel className="AccountOverview__DetailPanel" items={getItems()} title="Account Information" />
    </div>
  );
};

export default AccountOverview;
