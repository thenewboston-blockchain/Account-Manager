import {setPrimaryValidatorUpdatedNotification} from '@renderer/store/notifications';
import {AppDispatch} from '@renderer/types';
import {displayToast} from '@renderer/utils/toast';

import {generateUuid} from './utils';

const handleCrawlStatusNotifications = async (
  nothing: undefined, // TODO: Update
  dispatch: AppDispatch,
  notification: any,
): Promise<void> => {
  try {
    dispatch(
      setPrimaryValidatorUpdatedNotification({
        data: notification.payload,
        id: generateUuid(),
        timestamp: new Date().getTime(),
        type: notification.notification_type,
      }),
    );
  } catch (err) {
    displayToast('An error occurred');
  }
};

export default handleCrawlStatusNotifications;
