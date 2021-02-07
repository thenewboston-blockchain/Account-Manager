import React, {FC} from 'react';
import clsx from 'clsx';
import {bemify} from '@thenewboston/utils';

import PageTable, {PageTableItems, PageTableData, PageTableProps} from '@renderer/components/PageTable';
import {Loader} from '@renderer/components/FormElements';

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
  return (
    <div className={clsx('PaginatedTable', className)}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PaginationSummary
            className={clsx('PaginatedTable__PaginationSummary', {
              ...bemify(className, '__PaginationSummary'),
            })}
            count={count}
            currentPage={currentPage}
          />
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
