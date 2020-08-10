import {createSlice} from '@reduxjs/toolkit';

import {BANK_CONFIRMATION_BLOCKS} from '@renderer/constants/store';
import {NodeConfirmationBlock} from '@renderer/types/entities';
import {DictWithPaginatedResultsAndError} from '@renderer/types/store';
import {unsetDataReducer, setPaginatedResultReducer, setPaginatedResultErrorReducer} from '@renderer/utils/store';

const bankConfirmationBlocks = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<NodeConfirmationBlock>,
  name: BANK_CONFIRMATION_BLOCKS,
  reducers: {
    setBankConfirmationBlocks: setPaginatedResultReducer<NodeConfirmationBlock>(),
    setBankConfirmationBlocksError: setPaginatedResultErrorReducer(),
    unsetBankConfirmationBlocks: unsetDataReducer(),
  },
});

export const {
  setBankConfirmationBlocks,
  setBankConfirmationBlocksError,
  unsetBankConfirmationBlocks,
} = bankConfirmationBlocks.actions;

export default bankConfirmationBlocks;
