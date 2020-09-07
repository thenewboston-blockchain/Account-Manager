import {ValidatorConfirmationBlock} from './network';

export interface Notification {
  notificationTime: number;
  notificationType: string;
  payload: ValidatorConfirmationBlock;
}

export enum NotificationType {
  confirmationBlockNotification = 'CONFIRMATION_BLOCK_NOTIFICATION',
}
