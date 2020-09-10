import ReconnectingWebSocket from 'reconnecting-websocket';

import {AppDispatch, NotificationType} from '@renderer/types';
import {displayErrorToast} from '@renderer/utils/toast';

import handleConfirmationBlockNotification from './confirmation-block-notifications';

export const initializeSockets = (accountNumbers: string[], bankSocketAddress: string): ReconnectingWebSocket[] => {
  return accountNumbers.map(
    (accountNumber) => new ReconnectingWebSocket(`${bankSocketAddress}/ws/confirmation_blocks/${accountNumber}`),
  );
};

export const processSocketEvent = (accountNumbers: string[], dispatch: AppDispatch, event: MessageEvent): void => {
  try {
    const notification = JSON.parse(event.data);
    if (notification.notification_type === NotificationType.confirmationBlockNotification) {
      handleConfirmationBlockNotification(accountNumbers, dispatch, notification);
    }
  } catch (error) {
    displayErrorToast(error);
  }
};
