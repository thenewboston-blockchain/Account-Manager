import intersection from 'lodash/intersection';

import {setAccountBalance} from '@renderer/store/accountBalances';
import {setManagedAccountBalance} from '@renderer/store/managedAccountBalances';
import {setConfirmationBlockNotification} from '@renderer/store/notifications';
import {AppDispatch} from '@renderer/types';
import {generateUuid} from '@renderer/utils/local';

const handleConfirmationBlockNotification = (
  relevantManagedAccountNumbers: string[],
  dispatch: AppDispatch,
  notification: any,
): void => {
  const {
    payload: {
      message: {
        block: {
          message: {txs},
        },
        updated_balances: updatedBalances,
      },
    },
  } = notification;

  const recipients = txs.map(({recipient}: any) => recipient);
  const managedAccountRecipients = intersection(relevantManagedAccountNumbers, recipients);
  if (!managedAccountRecipients.length) return;

  processUpdatedBalances(relevantManagedAccountNumbers, dispatch, updatedBalances);

  dispatch(
    setConfirmationBlockNotification({
      data: notification.payload,
      id: generateUuid(),
      timestamp: new Date().getTime(),
      type: notification.notification_type,
    }),
  );
};

const processUpdatedBalances = (
  relevantManagedAccountNumbers: string[],
  dispatch: AppDispatch,
  updatedBalances: any[],
): void => {
  updatedBalances
    .filter(({account_number: accountNumber}) => relevantManagedAccountNumbers.includes(accountNumber))
    .forEach(({account_number: accountNumber, balance}) => {
      const balancePayload = {
        account_number: accountNumber,
        balance: balance || 0,
      };
      dispatch(setAccountBalance(balancePayload));
      dispatch(setManagedAccountBalance(balancePayload));
    });
};

export default handleConfirmationBlockNotification;
