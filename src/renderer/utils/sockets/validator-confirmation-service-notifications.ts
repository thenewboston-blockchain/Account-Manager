import {setValidatorConfirmationServiceNotification} from '@renderer/store/notifications';
import {AppDispatch} from '@renderer/types';
import {displayToast} from '@renderer/utils/toast';
import {generateUuid} from '@renderer/utils/local';

const handleValidatorConfirmationServiceNotifications = async (
  bankSocketAddress: string,
  dispatch: AppDispatch,
  notification: any,
): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log(bankSocketAddress, notification);
  try {
    dispatch(
      setValidatorConfirmationServiceNotification({
        data: notification.payload,
        id: generateUuid(),
        timestamp: new Date().getTime(),
        type: notification.notification_type,
      }),
    );

    displayToast(`Your bank purchased a validator confirmation service`);
  } catch (err) {
    displayToast('An error occurred');
  }
};

export default handleValidatorConfirmationServiceNotifications;
