import React, {FC, ReactNode, useCallback, useMemo} from 'react';
import clsx from 'clsx';
import noop from 'lodash/noop';

import Icon, {IconType} from '@renderer/components/Icon';
import {getCustomClassNames} from '@renderer/utils/components';
import './Pagination.scss';

interface ComponentProps {
  className?: string;
  currentPage: number;
  setPage(page: number): () => void;
  totalPages: number;
}

const TOTAL_VISIBLE_PAGES = 11;

const Pagination: FC<ComponentProps> = ({className, currentPage, setPage, totalPages}) => {
  const nextIsDisabled = useMemo(() => currentPage >= totalPages, [currentPage, totalPages]);
  const prevIsDisabled = useMemo(() => currentPage === 1, [currentPage]);
  const leftEllipsesIsVisible = useMemo(() => currentPage > Math.floor(TOTAL_VISIBLE_PAGES / 2) + 1, [currentPage]);
  const rightEllipsesIsVisible = useMemo(() => currentPage < totalPages - Math.floor(TOTAL_VISIBLE_PAGES / 2), [
    currentPage,
    totalPages,
  ]);

  const renderEllipses = useCallback((): ReactNode => {
    return (
      <div
        className={clsx('Pagination__button Pagination__button--ellipses', {
          ...getCustomClassNames(className, '__button', true),
          ...getCustomClassNames(className, '__button--ellipses', true),
        })}
      >
        ...
      </div>
    );
  }, [className]);

  const renderPage = useCallback(
    (page: number): ReactNode => {
      return (
        <div
          className={clsx('Pagination__button', {
            'Pagination__button--active': page === currentPage,
            ...getCustomClassNames(className, '__button', true),
            ...getCustomClassNames(className, '__button--active', page === currentPage),
          })}
          onClick={setPage(page)}
        >
          {page}
        </div>
      );
    },
    [className, currentPage, setPage],
  );

  const renderMiddle = useCallback((): ReactNode => {
    if (totalPages === 1) return null;

    const pageNodes = [renderPage(1)];
    if (leftEllipsesIsVisible) pageNodes.push(renderEllipses());

    const totalMiddleNumbers =
      TOTAL_VISIBLE_PAGES - 2 - (leftEllipsesIsVisible ? 1 : 0) - (rightEllipsesIsVisible ? 1 : 0);

    if (totalMiddleNumbers > 0) {
      const secondNumber = Math.max(currentPage - 3 - (leftEllipsesIsVisible ? 0 : 1), 2);
      const secondLastNumber = Math.min(currentPage + 3 + (rightEllipsesIsVisible ? 0 : 1), totalPages - 1);

      for (let i = secondNumber; i <= secondLastNumber; i += 1) {
        pageNodes.push(renderPage(i));
      }
    }

    if (rightEllipsesIsVisible) pageNodes.push(renderEllipses());
    pageNodes.push(renderPage(totalPages));

    return pageNodes;
  }, [currentPage, leftEllipsesIsVisible, renderEllipses, renderPage, rightEllipsesIsVisible, totalPages]);

  if (totalPages === 1) return null;
  return (
    <div className={clsx('Pagination', className)}>
      <Icon
        className={clsx('Pagination__button Pagination__button--prev', {
          ...getCustomClassNames(className, '__button', true),
          ...getCustomClassNames(className, '__button--prev', true),
        })}
        disabled={prevIsDisabled}
        icon={IconType.chevronLeft}
        onClick={prevIsDisabled ? noop : setPage(currentPage - 1)}
      />
      {renderMiddle()}
      <Icon
        className={clsx('Pagination__button Pagination__button--next', {
          ...getCustomClassNames(className, '__button', true),
          ...getCustomClassNames(className, '__button--next', true),
        })}
        disabled={nextIsDisabled}
        icon={IconType.chevronRight}
        onClick={nextIsDisabled ? noop : setPage(currentPage + 1)}
      />
    </div>
  );
};

export default Pagination;
