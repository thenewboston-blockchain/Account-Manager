import {createSlice} from '@reduxjs/toolkit';

import {BANK_INVALID_BLOCKS} from '@renderer/constants/store';
import {NodeInvalidBlock} from '@renderer/types/entities';
import {DictWithPaginatedResultsAndError} from '@renderer/types/store';
import {unsetDataReducer, setPaginatedResultReducer, setPaginatedResultErrorReducer} from '@renderer/utils/store';

const bankInvalidBlocks = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<NodeInvalidBlock>,
  name: BANK_INVALID_BLOCKS,
  reducers: {
    setBankInvalidBlocks: setPaginatedResultReducer<NodeInvalidBlock>(),
    setBankInvalidBlocksError: setPaginatedResultErrorReducer(),
    unsetBankInvalidBlocks: unsetDataReducer(),
  },
});

export const {setBankInvalidBlocks, setBankInvalidBlocksError, unsetBankInvalidBlocks} = bankInvalidBlocks.actions;

export default bankInvalidBlocks;
