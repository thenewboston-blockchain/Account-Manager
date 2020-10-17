import ReconnectingWebSocket from 'reconnecting-websocket';

import {AppDispatch, NotificationType} from '@renderer/types';
import {displayErrorToast} from '@renderer/utils/toast';

import handleConfirmationBlockNotification from './confirmation-block-notifications';
import handlePrimaryValidatorUpdatedNotifications from './primary-validator-updated-notifications';

export const initializeSocketsForConfirmationBlocks = (
  accountNumbers: string[],
  bankSocketAddress: string,
): ReconnectingWebSocket[] => {
  return accountNumbers.map(
    (accountNumber) => new ReconnectingWebSocket(`${bankSocketAddress}/ws/confirmation_blocks/${accountNumber}`),
  );
};

export const initializeSocketForPrimaryValidatorUpdated = (bankSocketAddress: string): ReconnectingWebSocket => {
  return new ReconnectingWebSocket(`${bankSocketAddress}/ws/primary_validator_updated`);
};

export const processSocketEvent = (payload: any, dispatch: AppDispatch, event: MessageEvent): void => {
  try {
    const notification = JSON.parse(event.data);
    if (notification.notification_type === NotificationType.confirmationBlockNotification) {
      handleConfirmationBlockNotification(payload, dispatch, notification);
    } else if (notification.notification_type === NotificationType.primaryValidatorUpdatedNotification) {
      handlePrimaryValidatorUpdatedNotifications(payload, dispatch, notification);
    }
  } catch (error) {
    displayErrorToast(error);
  }
};
