import React, {FC, ReactNode} from 'react';
import clsx from 'clsx';
import {bemify} from '@thenewboston/utils';

import './DetailPanel.scss';

interface Item {
  key: string;
  value: ReactNode;
}

interface ComponentProps {
  className?: string;
  items: Item[];
  tableHeaders?: [ReactNode, ReactNode];
  title: string;
}

const DetailPanel: FC<ComponentProps> = ({className, items, tableHeaders, title}) => {
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

  const renderTableHeader = (): ReactNode => {
    if (!tableHeaders) return null;

    return (
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={JSON.stringify(header)}>{header}</th>
          ))}
        </tr>
      </thead>
    );
  };

  return (
    <div className={clsx('DetailPanel', className)}>
      <h2 className={clsx('DetailPanel__title', {...bemify(className, '__title')})}>{title}</h2>
      <table className={clsx('DetailPanel__table', {...bemify(className, '__table')})}>
        {renderTableHeader()}
        {renderTableBody()}
      </table>
    </div>
  );
};

export default DetailPanel;
