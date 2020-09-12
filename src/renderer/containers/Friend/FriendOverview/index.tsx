import React, {FC, ReactNode, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import DetailPanel from '@renderer/components/DetailPanel';
import OverviewBalance from '@renderer/components/OverviewBalance';
import Qr from '@renderer/components/Qr';
import {getActivePrimaryValidatorConfig} from '@renderer/selectors';
import {formatAddress} from '@renderer/utils/address';

import './FriendOverview.scss';

const FriendOverview: FC = () => {
  const {accountNumber} = useParams();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const activePrimaryValidator = useSelector(getActivePrimaryValidatorConfig);

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
    return [
      {
        key: 'Balance',
        value: <OverviewBalance balance={balance} loading={loading} />,
      },
      {
        key: 'Account Number',
        value: renderAccountNumber(),
      },
    ];
  };

  const renderAccountNumber = (): ReactNode => (
    <>
      <div>{loading ? '-' : accountNumber}</div>
      <Qr className="FriendOverview__qr" text={accountNumber} width={120} />
    </>
  );

  return (
    <div className="FriendOverview">
      <DetailPanel className="FriendOverview__DetailPanel" items={getItems()} title="Friend Information" />
    </div>
  );
};

export default FriendOverview;
