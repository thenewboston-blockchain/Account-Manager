import React, {FC, ReactNode, useCallback} from 'react';
import clsx from 'clsx';
import noop from 'lodash/noop';

import {CrawlStatus, CleanStatus} from '@renderer/types';
import {getCustomClassNames} from '@renderer/utils/components';
import {getCrawlButtonLabel, getCrawlClassModifier, getCrawlDisplay} from '@renderer/utils/crawl';
import {getCleanButtonLabel, getCleanClassModifier, getCleanDisplay} from '@renderer/utils/clean';

import Tile from '../Tile';
import './TileCrawlClean.scss';

interface ComponentProps {
  className?: string;
  crawlStatus: CrawlStatus | null;
  handleCrawlClick(): Promise<void>;
  loadingCrawlStatus: boolean;
  submittingCrawl: boolean;
  cleanStatus: CleanStatus | null;
  handleCleanClick(): Promise<void>;
  loadingCleanStatus: boolean;
  submittingClean: boolean;
}

const TileCrawlClean: FC<ComponentProps> = ({
  className,
  crawlStatus,
  handleCrawlClick,
  loadingCrawlStatus,
  submittingCrawl,
  cleanStatus,
  handleCleanClick,
  loadingCleanStatus,
  submittingClean,
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

  const renderCleanButton = useCallback((): ReactNode => {
    const label = getCleanButtonLabel(cleanStatus);
    return label ? (
      <span
        className={clsx('TileCrawlClean__button', {'TileCrawlClean__button--disabled': submittingClean})}
        onClick={submittingClean ? noop : handleCleanClick}
      >
        {label}
      </span>
    ) : null;
  }, [cleanStatus, handleCleanClick, submittingClean]);

  const renderCleanStatus = useCallback((): ReactNode => {
    return (
      <div
        className={clsx('TileCrawlClean__status', `TileCrawlClean__status${getCleanClassModifier(cleanStatus)}`, {
          ...getCustomClassNames(className, '__status', true),
          ...getCustomClassNames(className, `__status${getCleanClassModifier(cleanStatus)}`, true),
        })}
      >
        {getCleanDisplay(loadingCleanStatus ? null : cleanStatus)}
      </div>
    );
  }, [className, cleanStatus, loadingCleanStatus]);

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
          {renderCleanStatus()}
          <div className={clsx('TileCrawlClean__button-container')}>{renderCleanButton()}</div>
        </div>
      </>
    </Tile>
  );
};

export default TileCrawlClean;
