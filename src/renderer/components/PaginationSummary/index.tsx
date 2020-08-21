import React, {FC, useMemo} from 'react';
import clsx from 'clsx';

import {PAGINATED_RESULTS_LIMIT} from '@renderer/config';

import './PaginationSummary.scss';

interface ComponentProps {
  className?: string;
  count: number;
  currentPage: number;
}

const PaginationSummary: FC<ComponentProps> = ({className, count, currentPage}) => {
  const firstRow = useMemo(() => Math.min((currentPage - 1) * PAGINATED_RESULTS_LIMIT + 1, count), [
    count,
    currentPage,
  ]);
  const lastRow = useMemo(() => Math.min(currentPage * PAGINATED_RESULTS_LIMIT, count), [count, currentPage]);

  const summary = useMemo(() => `${firstRow}–${lastRow} of ${count}`, [count, firstRow, lastRow]);

  return <div className={clsx('PaginationSummary', className)}>{summary}</div>;
};

export default PaginationSummary;
