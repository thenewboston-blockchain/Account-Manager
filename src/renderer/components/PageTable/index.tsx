import React, {FC, ReactNode, useState} from 'react';
import clsx from 'clsx';

import ArrowToggle from '@renderer/components/ArrowToggle';
import {getCustomClassNames} from '@renderer/utils/components';

import './PageTable.scss';
import Loader from '@renderer/components/FormElements/Loader';

interface Header {
  [tableKey: string]: string;
}

export interface PageTableData {
  key: string;
  [tableKey: string]: ReactNode;
}

export interface PageTableItems {
  orderedKeys: number[];
  headers: Header;
  data: PageTableData[];
}

interface ComponentProps {
  className?: string;
  items: PageTableItems;
  loading?: boolean;
}

const PageTable: FC<ComponentProps> = ({className, items, loading = false}) => {
  const {headers, data, orderedKeys} = items;
  const [expanded, setExpanded] = useState<number[]>([]);

  const toggleExpanded = (indexToToggle: number) => (): void => {
    setExpanded(
      expanded.includes(indexToToggle) ? expanded.filter((i) => i !== indexToToggle) : [...expanded, indexToToggle],
    );
  };

  const renderRows = (): ReactNode => {
    return data.map((item, dataIndex) => {
      const rowIsExpanded = expanded.includes(dataIndex);

      return (
        <tr
          className={clsx('PageTable__row', {
            'PageTable__row--expanded': rowIsExpanded,
            ...getCustomClassNames(className, '__row', true),
            ...getCustomClassNames(className, '__row--expanded', rowIsExpanded),
          })}
          key={item.key}
        >
          <td>
            <ArrowToggle
              className={clsx('PageTable__ArrowToggle', {...getCustomClassNames(className, '__ArrowToggle', true)})}
              expanded={rowIsExpanded}
              onClick={toggleExpanded(dataIndex)}
            />
          </td>
          {orderedKeys.map((key) => (
            <td key={key}>{item[key] || '-'}</td>
          ))}
        </tr>
      );
    });
  };

  return loading ? (
    <Loader />
  ) : (
    <table className={clsx('PageTable', className)}>
      <thead className={clsx('PageTable__thead', {...getCustomClassNames(className, '__thead', true)})}>
        <tr>
          <th />
          {orderedKeys.map((key) => (
            <td key={key}>{headers[key]}</td>
          ))}
        </tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );
};

export default PageTable;
