import {ValidatorConfirmationBlock, ValidatorConfirmationServicePayload} from './network';
import {NodeCrawlStatusWithAddress, NodeCleanStatusWithAddress} from './sockets';

export interface NotificationPayload<Data = any> {
  data: Data;
  id: string;
  timestamp: number;
  type: string;
}

export type ConfirmationBlockNotificationPayload = NotificationPayload<ValidatorConfirmationBlock>;

export type CrawlStatusNotificationPayload = NotificationPayload<NodeCrawlStatusWithAddress>;

export type CleanStatusNotificationPayload = NotificationPayload<NodeCleanStatusWithAddress>;

export type PrimaryValidatorUpdatedNotificationPayload = NotificationPayload;

export type ValidatorConfirmationServiceNotificationPayload = NotificationPayload<ValidatorConfirmationServicePayload>;

export enum NotificationType {
  confirmationBlockNotification = 'CONFIRMATION_BLOCK_NOTIFICATION',
  crawlStatusNotification = 'CRAWL_STATUS_NOTIFICATION',
  cleanStatusNotification = 'CLEAN_STATUS_NOTIFICATION',
  primaryValidatorUpdatedNotification = 'PRIMARY_VALIDATOR_UPDATED_NOTIFICATION',
  validatorConfirmationServiceNotification = 'VALIDATOR_CONFIRMATION_SERVICE_NOTIFICATION',
}
