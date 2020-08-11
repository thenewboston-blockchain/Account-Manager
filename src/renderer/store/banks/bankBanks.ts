import {createSlice} from '@reduxjs/toolkit';

import {BANK_BANKS} from '@renderer/constants';
import {DictWithPaginatedResultsAndError, NetworkNode} from '@renderer/types';
import {unsetDataReducer, setPaginatedResultReducer, setPaginatedResultErrorReducer} from '@renderer/utils/store';

const bankBanks = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<NetworkNode>,
  name: BANK_BANKS,
  reducers: {
    setBankBanks: setPaginatedResultReducer<NetworkNode>(),
    setBankBanksError: setPaginatedResultErrorReducer(),
    unsetBankBanks: unsetDataReducer(),
  },
});

export const {setBankBanks, setBankBanksError, unsetBankBanks} = bankBanks.actions;

export default bankBanks;
