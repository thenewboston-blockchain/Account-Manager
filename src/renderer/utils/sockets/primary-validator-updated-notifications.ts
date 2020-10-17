import {fetchAndDispatchPrimaryValidator} from '@renderer/dispatchers/app';
import {AppDispatch} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';
import {displayToast} from '@renderer/utils/toast';

const handlePrimaryValidatorUpdatedNotifications = async (
  bankSocketAddress: string,
  dispatch: AppDispatch,
  notification: any,
): Promise<void> => {
  const {payload} = notification;

  const primaryValidatorAddress = formatAddressFromNode(payload);

  try {
    const {validatorConfig} = await dispatch(fetchAndDispatchPrimaryValidator(primaryValidatorAddress));
    if (validatorConfig) {
      displayToast('Primary Validator has been changed');
    }
  } catch (err) {
    displayToast('An error occurred');
  }
};

export default handlePrimaryValidatorUpdatedNotifications;
