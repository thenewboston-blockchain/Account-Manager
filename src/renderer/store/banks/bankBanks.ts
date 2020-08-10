import {createSlice} from '@reduxjs/toolkit';

import {BANK_BANKS} from '@renderer/constants/store';
import {NetworkNode} from '@renderer/types/entities';
import {DictWithPaginatedResultsAndError} from '@renderer/types/store';
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
