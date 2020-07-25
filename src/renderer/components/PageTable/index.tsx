import React, {FC, ReactNode, useState} from 'react';
import clsx from 'clsx';

import ArrowToggle from '@renderer/components/ArrowToggle';
import {getCustomClassNames} from '@renderer/utils/components';

import './PageTable.scss';

interface Header {
  [key: string]: string;
}

interface Data {
  id: string;
  [key: string]: string | number;
}

interface PageTableItems {
  header: Header;
  data: Data[];
}

interface ComponentProps {
  className?: string;
  items: PageTableItems;
}

const PageTable: FC<ComponentProps> = ({className, items}) => {
  const {header, data} = items;
  const [expanded, setExpanded] = useState<boolean[]>(data.map(() => false));

  const toggleExpanded = (indexToToggle: number) => (): void => {
    setExpanded(expanded.map((rowIsExpanded, i) => (i === indexToToggle ? !rowIsExpanded : rowIsExpanded)));
  };

  const renderSampleRows = (): ReactNode => {
    return data.map((item, dataIndex) => {
      const rowIsExpanded = expanded[dataIndex];

      return (
        <tr
          className={clsx('PageTable__row', {
            'PageTable__row--expanded': rowIsExpanded,
            ...getCustomClassNames(className, '__row', true),
            ...getCustomClassNames(className, '__row--expanded', rowIsExpanded),
          })}
          key={item.id}
        >
          <td>
            <ArrowToggle
              className={clsx('PageTable__ArrowToggle', {...getCustomClassNames(className, '__ArrowToggle', true)})}
              expanded={rowIsExpanded}
              onClick={toggleExpanded(dataIndex)}
            />
          </td>
          {Object.keys(header).map((key, headerIndex) => (
            <td key={headerIndex}>{item[key]}</td>
          ))}
        </tr>
      );
    });
  };

  return (
    <table className={clsx('PageTable', className)}>
      <thead className={clsx('PageTable__thead', {...getCustomClassNames(className, '__thead', true)})}>
        <tr>
          <th />
          {Object.entries(header).map(([key, value]) => (
            <td key={key}>{value}</td>
          ))}
        </tr>
      </thead>
      <tbody>{renderSampleRows()}</tbody>
    </table>
  );
};

export default PageTable;
