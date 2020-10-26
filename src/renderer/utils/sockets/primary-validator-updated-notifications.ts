import {fetchAndDispatchPrimaryValidator} from '@renderer/dispatchers/app';
import {setPrimaryValidatorUpdatedNotification} from '@renderer/store/notifications';
import {AppDispatch} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';
import {generateUuid} from '@renderer/utils/local';
import {displayToast} from '@renderer/utils/toast';

const handlePrimaryValidatorUpdatedNotifications = async (
  bankSocketAddress: string,
  dispatch: AppDispatch,
  notification: any,
): Promise<void> => {
  const primaryValidatorAddress = formatAddressFromNode(notification.payload);

  try {
    const {validatorConfig} = await dispatch(fetchAndDispatchPrimaryValidator(primaryValidatorAddress));
    if (validatorConfig) {
      dispatch(
        setPrimaryValidatorUpdatedNotification({
          data: primaryValidatorAddress,
          id: generateUuid(),
          timestamp: new Date().getTime(),
          type: notification.notification_type,
        }),
      );

      displayToast(`The networks Primary Validator has been changed to ${primaryValidatorAddress}`);
    }
  } catch (err) {
    displayToast('An error occurred');
  }
};

export default handlePrimaryValidatorUpdatedNotifications;
