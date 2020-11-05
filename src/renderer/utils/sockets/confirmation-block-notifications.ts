import intersection from 'lodash/intersection';

import {setManagedAccountBalance} from '@renderer/store/app';
import {setConfirmationBlockNotification} from '@renderer/store/notifications';
import {AppDispatch} from '@renderer/types';

import {generateUuid} from './utils';

const handleConfirmationBlockNotification = (
  accountNumbers: string[],
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
  const managedAccountRecipients = intersection(accountNumbers, recipients);
  if (!managedAccountRecipients.length) return;

  processUpdatedBalances(accountNumbers, dispatch, updatedBalances);

  dispatch(
    setConfirmationBlockNotification({
      data: notification.payload,
      id: generateUuid(),
      timestamp: new Date().getTime(),
      type: notification.notification_type,
    }),
  );
};

const processUpdatedBalances = (accountNumbers: string[], dispatch: AppDispatch, updatedBalances: any[]): void => {
  updatedBalances
    .filter(({account_number: accountNumber}) => accountNumbers.includes(accountNumber))
    .forEach(({account_number: accountNumber, balance}) => {
      dispatch(
        setManagedAccountBalance({
          account_number: accountNumber,
          balance: balance || 0,
        }),
      );
    });
};

export default handleConfirmationBlockNotification;
