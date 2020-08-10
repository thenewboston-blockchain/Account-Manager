import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_CONFIRMATION_BLOCKS} from '@renderer/constants/store';
import {NodeConfirmationBlock} from '@renderer/types/entities';
import {DictWithPaginatedResultsAndError} from '@renderer/types/store';
import {unsetDataReducer, setPaginatedResultReducer, setPaginatedResultErrorReducer} from '@renderer/utils/store';

const validatorConfirmationBlocks = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<NodeConfirmationBlock>,
  name: VALIDATOR_CONFIRMATION_BLOCKS,
  reducers: {
    setValidatorConfirmationBlocks: setPaginatedResultReducer<NodeConfirmationBlock>(),
    setValidatorConfirmationBlocksError: setPaginatedResultErrorReducer(),
    unsetValidatorConfirmationBlocks: unsetDataReducer(),
  },
});

export const {
  setValidatorConfirmationBlocks,
  setValidatorConfirmationBlocksError,
  unsetValidatorConfirmationBlocks,
} = validatorConfirmationBlocks.actions;

export default validatorConfirmationBlocks;
