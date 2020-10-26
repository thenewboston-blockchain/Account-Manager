import ReconnectingWebSocket from 'reconnecting-websocket';

import {AppDispatch, NotificationType} from '@renderer/types';
import {displayErrorToast} from '@renderer/utils/toast';

import handleConfirmationBlockNotification from './confirmation-block-notifications';
import handleCrawlSocketEvent from './crawl';
import handlePrimaryValidatorUpdatedNotifications from './primary-validator-updated-notifications';

export const initializeSocketForCrawlStatus = (bankSocketAddress: string): ReconnectingWebSocket => {
  return new ReconnectingWebSocket(`${bankSocketAddress}/ws/crawl_status`);
};

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

// TODO: This is useless. Get rid of this function
export const processSocketEvent = (payload: any, dispatch: AppDispatch, event: MessageEvent): void => {
  try {
    const notification = JSON.parse(event.data);
    switch (notification.notification_type) {
      case NotificationType.confirmationBlockNotification:
        handleConfirmationBlockNotification(payload, dispatch, notification);
        break;
      case NotificationType.crawlStatusNotification:
        handleCrawlSocketEvent(payload, dispatch, notification);
        break;
      case NotificationType.primaryValidatorUpdatedNotification:
        handlePrimaryValidatorUpdatedNotifications(payload, dispatch, notification);
        break;
      default:
        displayErrorToast(`${notification.notification_type} is an unhandled notification type.`);
        break;
    }
  } catch (error) {
    displayErrorToast(error);
  }
};
