import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_INVALID_BLOCKS} from '@renderer/constants/store';
import {NodeInvalidBlock} from '@renderer/types/entities';
import {DictWithPaginatedResultsAndError} from '@renderer/types/store';
import {unsetDataReducer, setPaginatedResultReducer, setPaginatedResultErrorReducer} from '@renderer/utils/store';

const validatorInvalidBlocks = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<NodeInvalidBlock>,
  name: VALIDATOR_INVALID_BLOCKS,
  reducers: {
    setValidatorInvalidBlocks: setPaginatedResultReducer<NodeInvalidBlock>(),
    setValidatorInvalidBlocksError: setPaginatedResultErrorReducer(),
    unsetValidatorInvalidBlocks: unsetDataReducer(),
  },
});

export const {
  setValidatorInvalidBlocks,
  setValidatorInvalidBlocksError,
  unsetValidatorInvalidBlocks,
} = validatorInvalidBlocks.actions;

export default validatorInvalidBlocks;
