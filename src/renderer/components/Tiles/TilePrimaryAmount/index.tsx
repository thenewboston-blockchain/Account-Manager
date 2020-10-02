import React, {FC, memo} from 'react';
import clsx from 'clsx';

import {getCustomClassNames} from '@renderer/utils/components';

import Tile from '../Tile';
import './TilePrimaryAmount.scss';

interface ComponentProps {
  title: string;
  amount: number;
  className?: string;
}

const TilePrimaryAmount: FC<ComponentProps> = ({title, amount, className}) => {
  return (
    <Tile className={clsx('TilePrimaryAmount', className)}>
      <>
        <div className={clsx('TilePrimaryAmount__title', {...getCustomClassNames(className, '__title', true)})}>
          {title}
        </div>
        <div className={clsx('TilePrimaryAmount__amount', {...getCustomClassNames(className, '__amount', true)})}>
          {amount}
        </div>
      </>
    </Tile>
  );
};

export default memo(TilePrimaryAmount);
