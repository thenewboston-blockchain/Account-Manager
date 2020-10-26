import {ValidatorConfirmationBlock} from './network';
import {NodeCrawlStatusWithAddress} from './sockets';

export interface NotificationPayload<Data = any> {
  data: Data;
  id: string;
  timestamp: number;
  type: string;
}

export type ConfirmationBlockNotificationPayload = NotificationPayload<ValidatorConfirmationBlock>;

export type CrawlStatusNotificationPayload = NotificationPayload<NodeCrawlStatusWithAddress>;

export type PrimaryValidatorUpdatedNotificationPayload = NotificationPayload<NodeCrawlStatusWithAddress>;

export enum NotificationType {
  confirmationBlockNotification = 'CONFIRMATION_BLOCK_NOTIFICATION',
  crawlStatusNotification = 'CRAWL_STATUS_NOTIFICATION',
  primaryValidatorUpdatedNotification = 'PRIMARY_VALIDATOR_UPDATED_NOTIFICATION',
}
