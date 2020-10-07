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
  const renderTableBody = (): ReactNode => {
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
      <table className="TileKeyValueList__table">{renderTableBody()}</table>
    </Tile>
  );
};

export default TileKeyValueList;
