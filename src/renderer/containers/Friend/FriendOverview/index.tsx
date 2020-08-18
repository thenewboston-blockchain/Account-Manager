import React, {FC, ReactNode, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import DetailPanel from '@renderer/components/DetailPanel';
import Qr from '@renderer/components/Qr';
import {getActivePrimaryValidatorConfig, getManagedFriends} from '@renderer/selectors';
import {formatAddress} from '@renderer/utils/address';

import './FriendOverview.scss';

const FriendOverview: FC = () => {
  const {friendNumber} = useParams();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const activePrimaryValidator = useSelector(getActivePrimaryValidatorConfig);
  const managedFriends = useSelector(getManagedFriends);
  const managedFriend = managedFriends[friendNumber];

  useEffect(() => {
    if (!activePrimaryValidator) return;

    const fetchData = async (): Promise<void> => {
      const {ip_address: ipAddress, port, protocol} = activePrimaryValidator;
      const address = formatAddress(ipAddress, port, protocol);

      setLoading(true);
      const {data} = await axios.get(`${address}/friend/${friendNumber}/balance`);
      setBalance(data.balance);
      setLoading(false);
    };

    fetchData();
  }, [friendNumber, activePrimaryValidator]);

  const getItems = () => {
    const items = [
      {
        key: 'Balance',
        value: loading ? '-' : balance || '0',
      },
      {
        key: 'Friend Number',
        value: renderFriendNumber(),
      },
    ];

    return items;
  };

  const renderFriendNumber = (): ReactNode => (
    <>
      <div>{loading ? '-' : friendNumber}</div>
      <Qr className="FriendOverview__qr" text={friendNumber} width={120} />
    </>
  );

  return (
    <div className="FriendOverview">
      <DetailPanel className="FriendOverview__DetailPanel" items={getItems()} title="Friend Info" />
    </div>
  );
};

export default FriendOverview;
