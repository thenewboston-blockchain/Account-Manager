import React, {FC, ReactNode} from 'react';
import clsx from 'clsx';
import {bemify} from '@thenewboston/utils';

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
  className?: string;
  handleSelectRow?(i: number): GenericVoidFunction;
  items: PageTableItems;
  selectedData?: {[key: string]: any};
}

const PageTable: FC<PageTableProps> = ({className, handleSelectRow, items, selectedData}) => {
  const {headers, data, orderedKeys} = items;

  const hasCheckbox = !!handleSelectRow && !!selectedData;

  const renderRows = (): ReactNode => {
    return data.map((item, dataIndex) => {
      return (
        <tr
          className={clsx('PageTable__row', {
            ...bemify(className, '__row'),
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
          {orderedKeys.map((key) => (
            <th className={clsx('PageTable__th', {...bemify(className, '__th')})} key={key}>
              {headers[key]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={clsx('PageTable__tbody', {...bemify(className, '__tbody')})}>{renderRows()}</tbody>
    </table>
  );
};

export default PageTable;
