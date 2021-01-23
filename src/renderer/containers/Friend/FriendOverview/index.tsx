import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';

import {TileAccountBalance, TileAccountNumber} from '@renderer/components/Tiles';
import {fetchAccountBalance} from '@renderer/dispatchers/balances';
import {AppDispatch} from '@renderer/types';
import {displayErrorToast} from '@renderer/utils/toast';

import './FriendOverview.scss';

const FriendOverview: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {accountNumber} = useParams<{accountNumber: string}>();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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
  }, [accountNumber, dispatch]);

  return (
    <div className="FriendOverview">
      <TileAccountBalance balance={balance || 0} loading={loading} type="friend" />
      <TileAccountNumber accountNumber={accountNumber} type="friend" />
    </div>
  );
};

export default FriendOverview;
