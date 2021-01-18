import {CrawlStatus} from '@renderer/types';

export const getCrawlButtonLabel = (crawlStatus: CrawlStatus | null): string => {
  switch (crawlStatus) {
    case CrawlStatus.crawling:
      return 'Stop';
    case CrawlStatus.stopRequested:
      return '';
    default:
      return 'Crawl';
  }
};

export const getCrawlClassModifier = (crawlStatus: CrawlStatus | null): string => {
  switch (crawlStatus) {
    case CrawlStatus.crawling:
      return '--active';
    case CrawlStatus.stopRequested:
      return '--active';
    default:
      return '--danger';
  }
};

export const getCrawlDisplay = (crawlStatus: CrawlStatus | null): string => {
  switch (crawlStatus) {
    case CrawlStatus.crawling:
      return 'Crawling';
    case CrawlStatus.stopRequested:
      return 'Stop Requested';
    default:
      return 'Not Crawling';
  }
};
