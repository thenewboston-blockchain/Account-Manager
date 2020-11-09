import React, {FC, memo, useMemo} from 'react';
import clsx from 'clsx';

import {getCustomClassNames} from '@renderer/utils/components';

import Tile from '../Tile';
import './TileAccountBalance.scss';

interface ComponentProps {
  balance: number;
  className?: string;
  loading: boolean;
  type: 'account' | 'friend' | 'default';
}

const TileAccountBalance: FC<ComponentProps> = ({balance, className, loading, type}) => {
  const title = useMemo(() => {
    switch (type) {
      case 'account':
        return 'My Account Balance';
      case 'friend':
        return "Friend's Account Balance";
      case 'default':
        return 'Account Balance';
      default:
        break;
    }
  }, [type]);

  const balanceStr = useMemo(() => {
    if (loading) return '-';
    return balance.toLocaleString();
  }, [balance, loading]);

  return (
    <Tile className={clsx('TileAccountBalance', className)}>
      <>
        <div className={clsx('TileAccountBalance__title', {...getCustomClassNames(className, '__title', true)})}>
          {title}
        </div>
        <div className={clsx('TileAccountBalance__amount', {...getCustomClassNames(className, '__amount', true)})}>
          {balanceStr}
        </div>
      </>
    </Tile>
  );
};

export default memo(TileAccountBalance);
