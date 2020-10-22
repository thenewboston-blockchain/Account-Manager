import {ValidatorConfirmationBlock} from './network';

export interface NotificationPayload<Data = any> {
  data: Data;
  id: string;
  timestamp: number;
  type: string;
}

export type ConfirmationBlockNotificationPayload = NotificationPayload<ValidatorConfirmationBlock>;

export type PrimaryValidatorUpdatedNotificationPayload = NotificationPayload<string>;

export enum NotificationType {
  confirmationBlockNotification = 'CONFIRMATION_BLOCK_NOTIFICATION',
  primaryValidatorUpdatedNotification = 'PRIMARY_VALIDATOR_UPDATED_NOTIFICATION',
}
