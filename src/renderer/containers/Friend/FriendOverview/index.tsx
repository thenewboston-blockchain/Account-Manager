import React, {FC, useEffect} from 'react';
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
    <div className="FriendOverview">
      <TileAccountBalance accountNumber={accountNumber} type="friend" />
      <TileAccountNumber accountNumber={accountNumber} type="friend" />
    </div>
  );
};

export default FriendOverview;
