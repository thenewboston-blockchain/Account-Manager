import React, {FC} from 'react';
import clsx from 'clsx';

import PageTable, {PageTableItems, PageTableData, PageTableProps} from '@renderer/components/PageTable';
import {Loader} from '@renderer/components/FormElements';
import {getCustomClassNames} from '@renderer/utils/components';

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
              ...getCustomClassNames(className, '__PaginationSummary', true),
            })}
            count={count}
            currentPage={currentPage}
          />
          <PageTable
            className={clsx('PaginatedTable__PageTable', {...getCustomClassNames(className, '__PageTable', true)})}
            handleSelectRow={handleSelectRow}
            items={items}
            selectedData={selectedData}
          />
        </>
      )}
      <Pagination
        className={clsx('PaginatedTable__Pagination', {...getCustomClassNames(className, '__Pagination', true)})}
        currentPage={currentPage}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export {PageTableData, PageTableItems};

export default PaginatedTable;
