import {ValidatorConfirmationBlock} from './network';

export interface Notification {
  notificationTime: number;
  notificationType: string;
  payload: ValidatorConfirmationBlock;
}

export interface NotificationDict {
  [key: number]: Notification;
}
