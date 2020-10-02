import React, {FC, memo, ReactNode, useMemo} from 'react';
import clsx from 'clsx';

import {getCustomClassNames} from '@renderer/utils/components';

import Tile from '../Tile';
import './TileKeyValueList.scss';

interface Item {
  key: string;
  value: ReactNode;
}

interface ComponentProps {
  className?: string;
  items: Item[];
}

const TileKeyValueList: FC<ComponentProps> = ({className, items}) => {
  const renderTable = (): ReactNode => {
    return (
      <tbody>
        {items.map(({key, value}) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <Tile className={clsx('TileKeyValueList', className)}>
      <table className={clsx('TileKeyValueList__table', {...getCustomClassNames(className, '__table', true)})}>
        {renderTable()}
      </table>
    </Tile>
  );
};

export default memo(TileKeyValueList);
