import React, {FC, ReactNode, useState} from 'react';
import clsx from 'clsx';
import {bemify} from '@thenewboston/utils';

import ArrowToggle from '@renderer/components/ArrowToggle';
import {Checkbox} from '@renderer/components/FormElements';
import {GenericVoidFunction} from '@renderer/types';

import './PageTable.scss';

interface Header {
  [tableKey: string]: ReactNode;
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
  alwaysExpanded?: boolean;
  className?: string;
  expanded?: boolean;
  handleSelectRow?(i: number): GenericVoidFunction;
  items: PageTableItems;
  selectedData?: {[key: string]: any};
}

const PageTable: FC<PageTableProps> = ({alwaysExpanded = false, className, handleSelectRow, items, selectedData}) => {
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
      const rowIsExpanded = alwaysExpanded || expanded.includes(dataIndex);

      return (
        <tr
          className={clsx('PageTable__row', {
            'PageTable__row--expanded': rowIsExpanded,
            ...bemify(className, '__row'),
            ...bemify(className, '__row--expanded', rowIsExpanded),
          })}
          key={item.key}
        >
          {hasCheckbox ? (
            <td
              className={clsx('PageTable__td', 'PageTable__td--checkbox', {
                ...bemify(className, '__td'),
                ...bemify(className, '__td--checkbox'),
              })}
            >
              <Checkbox
                checked={selectedData![item.key] !== undefined}
                onClick={handleSelectRow!(dataIndex)}
                value={item.key}
              />
            </td>
          ) : null}
          {alwaysExpanded ? null : (
            <td
              className={clsx('PageTable__td', 'PageTable__td--toggle', {
                ...bemify(className, '__td'),
                ...bemify(className, '__td--toggle'),
              })}
            >
              <ArrowToggle
                className={clsx('PageTable__ArrowToggle', {...bemify(className, '__ArrowToggle')})}
                expanded={rowIsExpanded}
                onClick={toggleExpanded(dataIndex)}
              />
            </td>
          )}
          {orderedKeys.map((key, index) => (
            <td
              className={clsx('PageTable__td', `PageTable__td--${index}`, {
                ...bemify(className, '__td'),
                ...bemify(className, `__td--${index}`),
              })}
              key={key}
            >
              {item[key] || '-'}
            </td>
          ))}
        </tr>
      );
    });
  };

  return (
    <table className={clsx('PageTable', className)}>
      <thead className={clsx('PageTable__thead', {...bemify(className, '__thead')})}>
        <tr>
          {hasCheckbox ? <th className={clsx('PageTable__th', {...bemify(className, '__th')})} /> : null}
          {alwaysExpanded ? null : <th className={clsx('PageTable__th', {...bemify(className, '__th')})} />}
          {orderedKeys.map((key) => (
            <th className={clsx('PageTable__th', {...bemify(className, '__th')})} key={key}>
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
