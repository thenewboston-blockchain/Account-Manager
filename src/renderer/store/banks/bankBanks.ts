import {createSlice} from '@reduxjs/toolkit';

import {BANK_BANKS} from '@renderer/constants/actions';
import {DictWithPaginatedResultsAndError, Node} from '@renderer/types';
import {setPaginatedResultErrorReducer, setPaginatedResultReducer, unsetDataReducer} from '@renderer/utils/store';

const bankBanks = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<Node>,
  name: BANK_BANKS,
  reducers: {
    setBankBanks: setPaginatedResultReducer<Node>(),
    setBankBanksError: setPaginatedResultErrorReducer(),
    unsetBankBanks: unsetDataReducer(),
  },
});

export const {setBankBanks, setBankBanksError, unsetBankBanks} = bankBanks.actions;

export default bankBanks.reducer;
