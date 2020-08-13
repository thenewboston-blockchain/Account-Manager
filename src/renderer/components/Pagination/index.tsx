import React, {FC, ReactNode, useMemo} from 'react';
import clsx from 'clsx';
import noop from 'lodash/noop';

import {getCustomClassNames} from '@renderer/utils/components';
import './Pagination.scss';

const MAX_PAGES_TO_SHOW = 10;

interface ComponentProps {
  className?: string;
  currentPage: number;
  setPage(page: number): () => void;
  totalPages: number;
}

const Pagination: FC<ComponentProps> = ({className, currentPage, setPage, totalPages}) => {
  const nextIsDisabled = useMemo(() => currentPage >= totalPages, [currentPage, totalPages]);
  const prevIsDisabled = useMemo(() => currentPage === 1, [currentPage]);

  const renderPages = (): ReactNode => {
    const firstPageToShow = Math.floor(currentPage / MAX_PAGES_TO_SHOW) * MAX_PAGES_TO_SHOW + 1;

    const pagesToRender: ReactNode[] = [];

    for (let i = firstPageToShow; i <= Math.min(firstPageToShow + MAX_PAGES_TO_SHOW - 1, totalPages || 1); i += 1) {
      const isCurrentPage = i === currentPage;
      pagesToRender.push(
        <span
          className={clsx('Pagination__button Pagination__page', {
            'Pagination__button--active': isCurrentPage,
            ...getCustomClassNames(className, '__button', true),
            ...getCustomClassNames(className, '__button--active', i === 1),
            ...getCustomClassNames(className, '__page', true),
          })}
          key={i}
          onClick={isCurrentPage ? noop : setPage(i)}
        >
          {i}
        </span>,
      );
    }

    return pagesToRender;
  };

  return (
    <div className={clsx('Pagination', className)}>
      <span
        className={clsx('Pagination__button Pagination__prev-button', {
          'Pagination__button--disabled': prevIsDisabled,
          ...getCustomClassNames(className, '__button', true),
          ...getCustomClassNames(className, '__button--disabled', prevIsDisabled),
          ...getCustomClassNames(className, '__prev-button', true),
        })}
        onClick={prevIsDisabled ? noop : setPage(currentPage - 1)}
      >
        {'<< Prev'}
      </span>
      <div className={clsx('Pagination__pages', {...getCustomClassNames(className, '__pages', true)})}>
        {renderPages()}
      </div>
      <span
        className={clsx('Pagination__button Pagination__next-button', {
          'Pagination__button--disabled': nextIsDisabled,
          ...getCustomClassNames(className, '__button', true),
          ...getCustomClassNames(className, '__button--disabled', nextIsDisabled),
          ...getCustomClassNames(className, '__next-button', true),
        })}
        onClick={nextIsDisabled ? noop : setPage(currentPage + 1)}
      >
        {'Next >>'}
      </span>
    </div>
  );
};

export default Pagination;
