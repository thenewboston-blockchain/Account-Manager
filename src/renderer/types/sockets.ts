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
  crawl_status: CrawlStatus | null;
}

export type NodeCrawlStatusWithAddress = NodeCrawlStatus & AddressData;

export enum CleanCommand {
  start = 'start',
  stop = 'stop',
}

export interface CleanSocketState extends Id, AddressData, Omit<NodeCleanStatus, 'clean_status'> {
  connectionStatus: SocketConnectionStatus;
  clean_status: CleanStatus | null;
  signingKey: string;
}

export enum CleanStatus {
  cleaning = 'cleaning',
  notCleaning = 'not_cleaning',
  stopRequested = 'stop_requested',
}

export interface NodeCleanStatus {
  clean_last_completed: string;
  clean_status: CleanStatus | null;
}

export type NodeCleanStatusWithAddress = NodeCleanStatus & AddressData;

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
