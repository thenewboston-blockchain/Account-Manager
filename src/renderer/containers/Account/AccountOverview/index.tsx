import React, {FC, ReactNode, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import DetailPanel from '@renderer/components/DetailPanel';
import Qr from '@renderer/components/Qr';
import {useBooleanState} from '@renderer/hooks';
import {getActivePrimaryValidatorConfig, getManagedAccounts} from '@renderer/selectors';
import {formatAddress} from '@renderer/utils/address';

import './AccountOverview.scss';

const AccountOverview: FC = () => {
  const {accountNumber} = useParams();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [signingKeyVisible, toggleSigningKeyVisible, , setSigningKeyVisibleFalse] = useBooleanState(false);
  const activePrimaryValidator = useSelector(getActivePrimaryValidatorConfig);
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
      setBalance(data.balance);
      setLoading(false);
    };

    fetchData();
  }, [accountNumber, activePrimaryValidator]);

  const getItems = () => {
    let items = [
      {
        key: 'Balance',
        value: loading ? '-' : balance || '0',
      },
      {
        key: 'Account Number',
        value: renderAccountNumber(),
      },
    ];

    if (managedAccount) {
      items = [
        ...items,
        {
          key: 'Signing Key',
          value: renderSigningKey(),
        },
      ];
    }

    return items;
  };

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
    return signingKeyVisible ? signingKey : '*'.repeat(64);
  };

  const renderSigningKeyToggle = () => {
    const toggleText = signingKeyVisible ? 'Hide' : 'Show';
    return (
      <span className="AccountOverview__signing-key-toggle" onClick={toggleSigningKeyVisible}>
        {toggleText}
      </span>
    );
  };

  const renderAccountNumber = (): ReactNode => (
    <>
      <div>{loading ? '-' : accountNumber}</div>
      <Qr className="AccountOverview__qr" text={accountNumber} width={120} />
    </>
  );

  return (
    <div className="AccountOverview">
      <DetailPanel className="AccountOverview__DetailPanel" items={getItems()} title="Account Info" />
    </div>
  );
};

export default AccountOverview;
