import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_CONFIRMATION_BLOCKS} from '@renderer/constants';
import {DictWithPaginatedResultsAndError, ValidatorConfirmationBlock} from '@renderer/types';
import {setPaginatedResultErrorReducer, setPaginatedResultReducer, unsetDataReducer} from '@renderer/utils/store';

const validatorConfirmationBlocks = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<ValidatorConfirmationBlock>,
  name: VALIDATOR_CONFIRMATION_BLOCKS,
  reducers: {
    setValidatorConfirmationBlocks: setPaginatedResultReducer<ValidatorConfirmationBlock>(),
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
