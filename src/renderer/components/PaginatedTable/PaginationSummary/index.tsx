import React, {FC, memo} from 'react';
import clsx from 'clsx';

import {PAGINATED_RESULTS_LIMIT} from '@renderer/config';

export interface PaginationSummaryProps {
  className?: string;
  count: number;
  currentPage: number;
}

const PaginationSummary: FC<PaginationSummaryProps> = ({className, count, currentPage}) => {
  const firstRow = Math.min((currentPage - 1) * PAGINATED_RESULTS_LIMIT + 1, count);
  const lastRow = Math.min(currentPage * PAGINATED_RESULTS_LIMIT, count);
  const summary = `${firstRow}-${lastRow} of ${count}`;

  return <div className={clsx('PaginationSummary', className)}>{summary}</div>;
};

export default memo(PaginationSummary);
