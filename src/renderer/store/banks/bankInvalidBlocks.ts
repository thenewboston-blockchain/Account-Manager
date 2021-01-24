import {createSlice} from '@reduxjs/toolkit';

import {BANK_INVALID_BLOCKS} from '@renderer/constants/actions';
import {DictWithPaginatedResultsAndError, InvalidBlock} from '@renderer/types';
import {setPaginatedResultErrorReducer, setPaginatedResultReducer, unsetDataReducer} from '@renderer/utils/store';

const bankInvalidBlocks = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<InvalidBlock>,
  name: BANK_INVALID_BLOCKS,
  reducers: {
    setBankInvalidBlocks: setPaginatedResultReducer<InvalidBlock>(),
    setBankInvalidBlocksError: setPaginatedResultErrorReducer(),
    unsetBankInvalidBlocks: unsetDataReducer(),
  },
});

export const {setBankInvalidBlocks, setBankInvalidBlocksError, unsetBankInvalidBlocks} = bankInvalidBlocks.actions;

export default bankInvalidBlocks.reducer;
