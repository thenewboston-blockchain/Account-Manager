import axios from 'axios';
import {getPrimaryValidator, getManagedAccounts} from '@renderer/selectors';
import {setAccountBalance} from '@renderer/store/accountBalances';
import {setManagedAccountBalance} from '@renderer/store/managedAccountBalances';
import {AppDispatch, Balance, RootState} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';
import {AXIOS_TIMEOUT_MS} from '@renderer/config';
import {Account, PrimaryValidator} from 'thenewboston';

export const fetchAccountBalance = (accountNumber: string) => async (
  dispatch: AppDispatch,
  getState: () => RootState,
): Promise<number> => {
  const state = getState();
  const managedAccounts = getManagedAccounts(state);
  const pvAddressData = getPrimaryValidator(state);
  const isManagedAccount = !!managedAccounts[accountNumber];

  if (!pvAddressData) throw new Error('No primary validator. Unable to fetch account balance.');
  const pvAddress = formatAddressFromNode(pvAddressData);
  const PV = new PrimaryValidator(pvAddress);

  const data = await PV.getAccountBalance(accountNumber);
  const balance = data.balance || 0;
  const balancePayload = {
    account_number: accountNumber,
    balance,
  };
  dispatch(setAccountBalance(balancePayload));
  if (isManagedAccount) {
    dispatch(setManagedAccountBalance(balancePayload));
  }

  return balance;
};
