import React, {FC, ReactNode, useCallback} from 'react';
import clsx from 'clsx';
import noop from 'lodash/noop';

import {CrawlStatus} from '@renderer/types';
import {getCustomClassNames} from '@renderer/utils/components';
import {getCrawlButtonLabel, getCrawlClassModifier, getCrawlDisplay} from '@renderer/utils/crawl';

import Tile from '../Tile';
import './TileCrawlClean.scss';

interface ComponentProps {
  className?: string;
  crawlStatus: CrawlStatus | null;
  handleCrawlClick(): Promise<void>;
  loadingCrawlStatus: boolean;
  submittingCrawl: boolean;
}

const TileCrawlClean: FC<ComponentProps> = ({
  className,
  crawlStatus,
  handleCrawlClick,
  loadingCrawlStatus,
  submittingCrawl,
}) => {
  const renderCrawlButton = useCallback((): ReactNode => {
    const label = getCrawlButtonLabel(crawlStatus);
    return label ? (
      <span
        className={clsx('TileCrawlClean__button', {'TileCrawlClean__button--disabled': submittingCrawl})}
        onClick={submittingCrawl ? noop : handleCrawlClick}
      >
        {label}
      </span>
    ) : null;
  }, [crawlStatus, handleCrawlClick, submittingCrawl]);

  const renderCrawlStatus = useCallback((): ReactNode => {
    return (
      <div
        className={clsx('TileCrawlClean__status', `TileCrawlClean__status${getCrawlClassModifier(crawlStatus)}`, {
          ...getCustomClassNames(className, '__status', true),
          ...getCustomClassNames(className, `__status${getCrawlClassModifier(crawlStatus)}`, true),
        })}
      >
        {getCrawlDisplay(loadingCrawlStatus ? null : crawlStatus)}
      </div>
    );
  }, [className, crawlStatus, loadingCrawlStatus]);

  return (
    <Tile className={clsx('TileCrawlClean', className)}>
      <>
        <div className={clsx('TileCrawlClean__row', {...getCustomClassNames(className, '__row', true)})}>
          <div className={clsx('TileCrawlClean__label', {...getCustomClassNames(className, '__label', true)})}>
            Crawl Status
          </div>
          {renderCrawlStatus()}
          <div className={clsx('TileCrawlClean__button-container')}>{renderCrawlButton()}</div>
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
