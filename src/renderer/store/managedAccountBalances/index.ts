import {createSlice} from '@reduxjs/toolkit';
import {MANAGED_ACCOUNT_BALANCES} from '@renderer/constants/actions';
import {AccountBalance, Dict} from '@renderer/types';
import {setBalanceReducer, unsetBalanceReducer} from '@renderer/utils/store';

const managedAccountBalances = createSlice({
  initialState: {} as Dict<AccountBalance>,
  name: MANAGED_ACCOUNT_BALANCES,
  reducers: {
    setManagedAccountBalance: setBalanceReducer(),
    unsetManagedAccountBalance: unsetBalanceReducer(),
  },
});

export const {setManagedAccountBalance, unsetManagedAccountBalance} = managedAccountBalances.actions;

export default managedAccountBalances.reducer;
