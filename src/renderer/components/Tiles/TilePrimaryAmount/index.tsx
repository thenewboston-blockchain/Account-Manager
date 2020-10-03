import React, {FC, memo} from 'react';
import clsx from 'clsx';

import Loader from '@renderer/components/FormElements/Loader';

import {getCustomClassNames} from '@renderer/utils/components';

import Tile from '../Tile';
import './TilePrimaryAmount.scss';

interface ComponentProps {
  amount: number;
  className?: string;
  loading: boolean;
  title: string;
}

const TilePrimaryAmount: FC<ComponentProps> = ({amount, className, loading, title}) => {
  return (
    <Tile className={clsx('TilePrimaryAmount', className)}>
      <>
        <div className={clsx('TilePrimaryAmount__title', {...getCustomClassNames(className, '__title', true)})}>
          {title}
        </div>
        <div className={clsx('TilePrimaryAmount__amount', {...getCustomClassNames(className, '__amount', true)})}>
          {loading ? <Loader /> : amount}
        </div>
      </>
    </Tile>
  );
};

export default memo(TilePrimaryAmount);
