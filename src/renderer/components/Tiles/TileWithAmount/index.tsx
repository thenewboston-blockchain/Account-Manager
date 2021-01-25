import React, {FC, memo, ReactNode} from 'react';
import clsx from 'clsx';

import Loader from '@renderer/components/FormElements/Loader';

import Tile from '../Tile';
import './TileWithAmount.scss';

interface ComponentProps {
  amount: number | string;
  className?: string;
  headerButton?: ReactNode;
  loading?: boolean;
  title: string;
}

const TileWithAmount: FC<ComponentProps> = ({amount, className, headerButton, loading = false, title}) => {
  const amountDisplay = typeof amount === 'number' ? amount.toLocaleString() : amount;

  return (
    <Tile className={clsx('TileWithAmount', className)}>
      <div className="header">
        <div className="header__title">{title}</div>
        {headerButton}
      </div>
      <div className="TileWithAmount__amount">{loading ? <Loader /> : amountDisplay}</div>
    </Tile>
  );
};

export default memo(TileWithAmount);
