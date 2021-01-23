import axios from 'axios';
import {getActivePrimaryValidator, getManagedAccounts} from '@renderer/selectors';
import {setManagedAccountBalance} from '@renderer/store/managedAccountBalances';
import {AppDispatch, Balance, RootState} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';

export const fetchAccountBalance = (accountNumber: string) => async (
  dispatch: AppDispatch,
  getState: () => RootState,
): Promise<number> => {
  const state = getState();
  const managedAccounts = getManagedAccounts(state);
  const primaryValidator = getActivePrimaryValidator(state);
  const isManagedAccount = !!managedAccounts[accountNumber];

  if (!primaryValidator) throw new Error('No primary validator. Unable to fetch account balance.');
  const address = formatAddressFromNode(primaryValidator);

  const {data} = await axios.get<Balance>(`${address}/accounts/${accountNumber}/balance`);
  const balance = data.balance || 0;
  const balancePayload = {
    account_number: accountNumber,
    balance,
  };
  if (isManagedAccount) {
    dispatch(setManagedAccountBalance(balancePayload));
  }

  return balance;
};
