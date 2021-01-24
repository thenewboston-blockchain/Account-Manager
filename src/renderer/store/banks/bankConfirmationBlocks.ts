import {createSlice} from '@reduxjs/toolkit';

import {BANK_CONFIRMATION_BLOCKS} from '@renderer/constants/actions';
import {BankConfirmationBlock, DictWithPaginatedResultsAndError} from '@renderer/types';
import {setPaginatedResultErrorReducer, setPaginatedResultReducer, unsetDataReducer} from '@renderer/utils/store';

const bankConfirmationBlocks = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<BankConfirmationBlock>,
  name: BANK_CONFIRMATION_BLOCKS,
  reducers: {
    setBankConfirmationBlocks: setPaginatedResultReducer<BankConfirmationBlock>(),
    setBankConfirmationBlocksError: setPaginatedResultErrorReducer(),
    unsetBankConfirmationBlocks: unsetDataReducer(),
  },
});

export const {
  setBankConfirmationBlocks,
  setBankConfirmationBlocksError,
  unsetBankConfirmationBlocks,
} = bankConfirmationBlocks.actions;

export default bankConfirmationBlocks.reducer;
