import React, {FC, memo} from 'react';
import clsx from 'clsx';

import Loader from '@renderer/components/FormElements/Loader';

import Tile from '../Tile';
import './TileDailyRate.scss';

interface ComponentProps {
  amount: number | string;
  className?: string;
  loading?: boolean;
  title: string;
}

const TileDailyRate: FC<ComponentProps> = ({amount, className, loading = false, title}) => {
  return (
    <Tile className={clsx('TileDailyRate', className)}>
      <div className="TileDailyRate__title">{title}</div>
      <div className="TileDailyRate__amount">{loading ? <Loader /> : amount}</div>
    </Tile>
  );
};

export default memo(TileDailyRate);
