import React, {FC, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import {TileAccountBalance, TileAccountNumber} from '@renderer/components/Tiles';
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

  return (
    <div className="FriendOverview">
      <TileAccountBalance balance={balance || 0} loading={loading} type="account" />
      <TileAccountNumber accountNumber={accountNumber} type="account" />
    </div>
  );
};

export default FriendOverview;
