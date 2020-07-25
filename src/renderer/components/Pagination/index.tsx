import React, {FC, ReactNode} from 'react';
import clsx from 'clsx';

import {getCustomClassNames} from '@renderer/utils/components';
import './Pagination.scss';

interface ComponentProps {
  className?: string;
}

const Pagination: FC<ComponentProps> = ({className}) => {
  const renderSamplePages = (): ReactNode => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
      <a
        className={clsx('Pagination__page', {
          'Pagination__page--active': i === 1,
          ...getCustomClassNames(className, '__page', true),
          ...getCustomClassNames(className, '__page--active', i === 1),
        })}
        href="/"
        key={i}
      >
        {i}
      </a>
    ));
  };

  return (
    <div className={clsx('Pagination', className)}>
      <a
        className={clsx('Pagination__prev-button', {...getCustomClassNames(className, '__prev-button', true)})}
        href="/"
      >
        {'<< Prev'}
      </a>
      <div className={clsx('Pagination__pages', {...getCustomClassNames(className, '__pages', true)})}>
        {renderSamplePages()}
      </div>
      <a
        className={clsx('Pagination__next-button', {...getCustomClassNames(className, '__next-button', true)})}
        href="/"
      >
        {'Next >>'}
      </a>
    </div>
  );
};

export default Pagination;
