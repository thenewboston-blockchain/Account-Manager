import React, {FC, ReactNode} from 'react';
import clsx from 'clsx';

import {getCustomClassNames} from '@renderer/utils/components';

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
      <h2 className={clsx('DetailPanel__title', {...getCustomClassNames(className, '__title', true)})}>{title}</h2>
      <table className={clsx('DetailPanel__table', {...getCustomClassNames(className, '__table', true)})}>
        {renderTableHeader()}
        {renderTableBody()}
      </table>
    </div>
  );
};

export default DetailPanel;
