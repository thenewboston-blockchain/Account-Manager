import {AddressData, Id} from '@renderer/types/network';

export enum CrawlCommand {
  start = 'start',
  stop = 'stop',
}

export interface CrawlSocketState extends Id, AddressData, Omit<NodeCrawlStatus, 'crawl_status'> {
  connectionStatus: SocketConnectionStatus;
  crawl_status: CrawlStatus | null;
  signingKey: string;
}

export enum CrawlStatus {
  crawling = 'crawling',
  notCrawling = 'not_crawling',
  stopRequested = 'stop_requested',
}

export interface NodeCrawlStatus {
  crawl_last_completed: string;
  crawl_status: CrawlStatus;
}

export type NodeCrawlStatusWithAddress = NodeCrawlStatus & AddressData;

export enum SocketConnectionStatus {
  failed = 'failed',
  active = 'active',
  completed = 'completed',
  inactive = 'inactive',
}

export enum SocketType {
  clean = 'clean',
  crawl = 'crawl',
}
