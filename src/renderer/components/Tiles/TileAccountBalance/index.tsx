import React, {FC, memo, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import clsx from 'clsx';
import {Icon, IconType} from '@thenewboston/ui';
import {bemify} from '@thenewboston/utils';

import {fetchAccountBalance} from '@renderer/dispatchers/balances';
import {getAccountBalances} from '@renderer/selectors';
import {AccountType, AppDispatch} from '@renderer/types';
import {displayErrorToast} from '@renderer/utils/toast';

import Tile from '../Tile';
import './TileAccountBalance.scss';

interface ComponentProps {
  accountNumber: string;
  className?: string;
  type: AccountType | null;
}

const TileAccountBalance: FC<ComponentProps> = ({accountNumber, className, type}) => {
  const dispatch = useDispatch<AppDispatch>();
  const refreshIconRef = useRef<HTMLDivElement>(null);
  const accountBalances = useSelector(getAccountBalances);
  const [balancedUpdated, setBalanceUpdated] = useState<boolean>(false);
  const [refreshDisabled, setRefreshDisabled] = useState<boolean>(false);

  const accountBalanceObject = accountBalances[accountNumber];
  const balance = accountBalanceObject ? accountBalanceObject.balance : null;

  const title = useMemo(() => {
    switch (type) {
      case AccountType.managedAccount:
        return 'My Account Balance';
      case AccountType.managedFriend:
        return "Friend's Account Balance";
      default:
        return 'Account Balance';
    }
  }, [type]);

  const balanceStr = useMemo(() => {
    if (balance === null) return '-';
    return balance.toLocaleString();
  }, [balance]);

  const handleRefresh = async (): Promise<void> => {
    refreshIconRef.current?.blur();
    try {
      setRefreshDisabled(true);

      await dispatch(fetchAccountBalance(accountNumber));
      setBalanceUpdated(true);
    } catch (error) {
      displayErrorToast(error);
    } finally {
      // setTimeout to prevent multiple clicks
      setTimeout(() => {
        setBalanceUpdated(false);
        setRefreshDisabled(false);
      }, 1000);
    }
  };

  return (
    <Tile className={clsx('TileAccountBalance', className)}>
      <>
        <div className={clsx('TileAccountBalance__top', {...bemify(className, '__top')})}>
          <div className={clsx('TileAccountBalance__title', {...bemify(className, '__title')})}>{title}</div>
          <Icon
            className={clsx('TileAccountBalance__refresh-icon', {
              ...bemify(className, '__refresh-icon'),
            })}
            disabled={refreshDisabled}
            icon={IconType.refresh}
            onClick={handleRefresh}
            ref={refreshIconRef}
          />
        </div>
        <div
          className={clsx('TileAccountBalance__amount', {
            'TileAccountBalance__amount--updated': balancedUpdated,
            ...bemify(className, '__amount'),
            ...bemify(className, '__amount--updated', balancedUpdated),
          })}
        >
          {balanceStr}
        </div>
      </>
    </Tile>
  );
};

export default memo(TileAccountBalance);
