import intersection from 'lodash/intersection';

import {setManagedAccountBalance} from '@renderer/store/app';
import {setConfirmationBlockNotification} from '@renderer/store/notifications';
import {AppDispatch} from '@renderer/types';

const handleConfirmationBlockNotification = (accountNumbers: string[], dispatch: AppDispatch, notification: any) => {
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
  const managedAccountRecipients = intersection(accountNumbers, recipients);
  if (!managedAccountRecipients.length) return;

  processUpdatedBalances(accountNumbers, dispatch, updatedBalances);

  dispatch(
    setConfirmationBlockNotification({
      notificationTime: new Date().getTime(),
      notificationType: notification.notification_type,
      payload: notification.payload,
    }),
  );
};

const processUpdatedBalances = (accountNumbers: string[], dispatch: AppDispatch, updatedBalances: any[]) => {
  updatedBalances
    .filter(({account_number: accountNumber}) => accountNumbers.includes(accountNumber))
    .forEach(({account_number: accountNumber, balance}) => {
      dispatch(
        setManagedAccountBalance({
          account_number: accountNumber,
          balance: balance || '0',
        }),
      );
    });
};

export default handleConfirmationBlockNotification;
