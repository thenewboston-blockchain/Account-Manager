import React, {FC, memo} from 'react';
import clsx from 'clsx';

import Loader from '@renderer/components/FormElements/Loader';

import Tile from '../Tile';
import './TilePrimaryAmount.scss';

interface ComponentProps {
  amount: number;
  className?: string;
  loading?: boolean;
  title: string;
}

const TilePrimaryAmount: FC<ComponentProps> = ({amount, className, loading = false, title}) => {
  return (
    <Tile className={clsx('TilePrimaryAmount', className)}>
      <div className="TilePrimaryAmount__title">{title}</div>
      <div className="TilePrimaryAmount__amount">{loading ? <Loader /> : amount}</div>
    </Tile>
  );
};

export default memo(TilePrimaryAmount);
