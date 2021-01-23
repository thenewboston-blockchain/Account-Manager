import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {TileAccountBalance, TileAccountNumber} from '@renderer/components/Tiles';
import {fetchAccountBalance} from '@renderer/dispatchers/balances';
import {getAccountBalances} from '@renderer/selectors';
import {AppDispatch} from '@renderer/types';
import {displayErrorToast} from '@renderer/utils/toast';

import './FriendOverview.scss';

const FriendOverview: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {accountNumber} = useParams<{accountNumber: string}>();
  const accountBalances = useSelector(getAccountBalances);

  const accountBalanceObject = accountBalances[accountNumber];
  const balance = accountBalanceObject ? accountBalanceObject.balance : null;

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
      <TileAccountBalance balance={balance} type="friend" />
      <TileAccountNumber accountNumber={accountNumber} type="friend" />
    </div>
  );
};

export default FriendOverview;
