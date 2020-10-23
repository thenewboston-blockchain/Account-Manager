import {CrawlStatus} from '@renderer/types/network';

export const getCrawlButtonLabel = (crawlStatus: CrawlStatus | null): string => {
  switch (crawlStatus) {
    case CrawlStatus.crawling:
      return 'Stop';
    case CrawlStatus.notCrawling:
      return 'Crawl';
    case CrawlStatus.stopRequested:
      return '';
    default:
      return '';
  }
};

export const getCrawlClassModifier = (crawlStatus: CrawlStatus | null): string => {
  switch (crawlStatus) {
    case CrawlStatus.crawling:
      return '--active';
    case CrawlStatus.notCrawling:
      return '--danger';
    case CrawlStatus.stopRequested:
      return '--active';
    default:
      return '';
  }
};

export const getCrawlDisplay = (crawlStatus: CrawlStatus | null): string => {
  switch (crawlStatus) {
    case CrawlStatus.crawling:
      return 'Crawling';
    case CrawlStatus.notCrawling:
      return 'Not Crawling';
    case CrawlStatus.stopRequested:
      return 'Stop Requested';
    default:
      return '-';
  }
};
