import React, {FC, ReactNode} from 'react';
import clsx from 'clsx';

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
      <table className="TileKeyValueList__table">{renderTable()}</table>
    </Tile>
  );
};

export default TileKeyValueList;
