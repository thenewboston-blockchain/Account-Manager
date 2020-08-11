import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_INVALID_BLOCKS} from '@renderer/constants';
import {DictWithPaginatedResultsAndError, InvalidBlock} from '@renderer/types';
import {setPaginatedResultErrorReducer, setPaginatedResultReducer, unsetDataReducer} from '@renderer/utils/store';

const validatorInvalidBlocks = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<InvalidBlock>,
  name: VALIDATOR_INVALID_BLOCKS,
  reducers: {
    setValidatorInvalidBlocks: setPaginatedResultReducer<InvalidBlock>(),
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
