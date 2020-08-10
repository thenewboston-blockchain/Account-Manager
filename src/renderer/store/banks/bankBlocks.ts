import {createSlice} from '@reduxjs/toolkit';

import {BANK_BLOCKS} from '@renderer/constants/store';
import {NodeBlock} from '@renderer/types/entities';
import {DictWithPaginatedResultsAndError} from '@renderer/types/store';
import {unsetDataReducer, setPaginatedResultReducer, setPaginatedResultErrorReducer} from '@renderer/utils/store';

const bankBlocks = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<NodeBlock>,
  name: BANK_BLOCKS,
  reducers: {
    setBankBlocks: setPaginatedResultReducer<NodeBlock>(),
    setBankBlocksError: setPaginatedResultErrorReducer(),
    unsetBankBlocks: unsetDataReducer(),
  },
});

export const {setBankBlocks, setBankBlocksError, unsetBankBlocks} = bankBlocks.actions;

export default bankBlocks;
