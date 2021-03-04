import React, {FC} from 'react';
import clsx from 'clsx';
import {bemify} from '@thenewboston/utils';

import PageTable, {PageTableItems, PageTableData, PageTableProps} from '@renderer/components/PageTable';
import {Loader, Switch} from '@renderer/components/FormElements';
import {useBooleanState} from '@renderer/hooks';

import Pagination, {PaginationProps} from './Pagination';
import PaginationSummary, {PaginationSummaryProps} from './PaginationSummary';
import './PaginatedTable.scss';

interface ComponentProps extends PageTableProps, PaginationProps, PaginationSummaryProps {
  className?: string;
  loading: boolean;
}

const PaginatedTable: FC<ComponentProps> = ({
  className,
  count,
  currentPage,
  handleSelectRow,
  items,
  loading,
  selectedData,
  setPage,
  totalPages,
}) => {
  const [expanded, toggleExpanded] = useBooleanState(false);

  return (
    <div className={clsx('PaginatedTable', className)}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="header">
            <div className="header__left">
              <PaginationSummary
                className={clsx('PaginatedTable__PaginationSummary', {
                  ...bemify(className, '__PaginationSummary'),
                })}
                count={count}
                currentPage={currentPage}
              />
            </div>
            <div className="header__right">
              <div
                className={clsx('PaginatedTable__expand-toggle-container', {
                  ...bemify(className, '__expand-toggle-container'),
                })}
              >
                <Switch
                  checked={expanded}
                  className={clsx('PaginatedTable__expand-toggle', {...bemify(className, '__expand-toggle')})}
                  label="Show full info"
                  onChange={toggleExpanded}
                />
              </div>
            </div>
          </div>
          <PageTable
            className={clsx('PaginatedTable__PageTable', {...bemify(className, '__PageTable')})}
            handleSelectRow={handleSelectRow}
            items={items}
            selectedData={selectedData}
          />
        </>
      )}
      <Pagination
        className={clsx('PaginatedTable__Pagination', {...bemify(className, '__Pagination')})}
        currentPage={currentPage}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export {PageTableData, PageTableItems};

export default PaginatedTable;
