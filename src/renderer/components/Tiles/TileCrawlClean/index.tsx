import React, {FC} from 'react';
import clsx from 'clsx';

import {getCustomClassNames} from '@renderer/utils/components';

import Tile from '../Tile';
import './TileCrawlClean.scss';

interface ComponentProps {
  className?: string;
}

const TileCrawlClean: FC<ComponentProps> = ({className}) => {
  return (
    <Tile className={clsx('TileCrawlClean', className)}>
      <>
        <div className={clsx('TileCrawlClean__row', {...getCustomClassNames(className, '__row', true)})}>
          <div className={clsx('TileCrawlClean__label', {...getCustomClassNames(className, '__label', true)})}>
            Crawl Status
          </div>
          <div
            className={clsx('TileCrawlClean__status', 'TileCrawlClean__status--danger', {
              ...getCustomClassNames(className, '__status', true),
              ...getCustomClassNames(className, '__status--danger', true),
            })}
          >
            Not Crawling
          </div>
          <div className={clsx('TileCrawlClean__button-container')}>
            <span className="TileCrawlClean__button">Crawl</span>
          </div>
        </div>
        <div className={clsx('TileCrawlClean__row', {...getCustomClassNames(className, '__row', true)})}>
          <div className={clsx('TileCrawlClean__label', {...getCustomClassNames(className, '__label', true)})}>
            Clean Status
          </div>
          <div
            className={clsx('TileCrawlClean__status', 'TileCrawlClean__status--active', {
              ...getCustomClassNames(className, '__status', true),
              ...getCustomClassNames(className, '__status--active', true),
            })}
          >
            Cleaning
          </div>
          <div className={clsx('TileCrawlClean__button-container')}>
            <span className="TileCrawlClean__button">Stop</span>
          </div>
        </div>
      </>
    </Tile>
  );
};

export default TileCrawlClean;
