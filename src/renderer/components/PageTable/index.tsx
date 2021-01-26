import React, {FC, ReactNode, useState} from 'react';
import clsx from 'clsx';

import ArrowToggle from '@renderer/components/ArrowToggle';
import {Checkbox} from '@renderer/components/FormElements';
import {GenericVoidFunction} from '@renderer/types';
import {getCustomClassNames} from '@renderer/utils/components';

import './PageTable.scss';

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

export interface PageTableProps {
  className?: string;
  handleSelectRow?(i: number): GenericVoidFunction;
  items: PageTableItems;
  selectedData?: {[key: string]: number};
}

const PageTable: FC<PageTableProps> = ({className, handleSelectRow, items, selectedData}) => {
  const {headers, data, orderedKeys} = items;
  const [expanded, setExpanded] = useState<number[]>([]);

  const hasCheckbox = !!handleSelectRow && !!selectedData;

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
          {hasCheckbox ? (
            <td className="PageTable__td PageTable__td--checkbox">
              <Checkbox
                checked={selectedData![item.key] !== undefined}
                onClick={handleSelectRow!(dataIndex)}
                value={item.key}
              />
            </td>
          ) : null}
          <td className="PageTable__td">
            <ArrowToggle
              className={clsx('PageTable__ArrowToggle', {...getCustomClassNames(className, '__ArrowToggle', true)})}
              expanded={rowIsExpanded}
              onClick={toggleExpanded(dataIndex)}
            />
          </td>
          {orderedKeys.map((key) => (
            <td className="PageTable__td" key={key}>
              {item[key] || '-'}
            </td>
          ))}
        </tr>
      );
    });
  };

  return (
    <table className={clsx('PageTable', className)}>
      <thead className={clsx('PageTable__thead', {...getCustomClassNames(className, '__thead', true)})}>
        <tr>
          {hasCheckbox ? <th className="PageTable__th" /> : null}
          <th className="PageTable__th" />
          {orderedKeys.map((key) => (
            <th className="PageTable__th" key={key}>
              {headers[key]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );
};

export default PageTable;
