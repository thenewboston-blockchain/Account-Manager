import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_CONFIRMATION_BLOCKS} from '@renderer/constants/store';
import {NodeConfirmationBlock} from '@renderer/types/entities';
import {DataWithError} from '@renderer/types/store';
import {setDataReducer, setErrorReducer, unsetDataReducer} from '@renderer/utils/store';

const validatorConfirmationBlocks = createSlice({
  initialState: {} as DataWithError<NodeConfirmationBlock[]>,
  name: VALIDATOR_CONFIRMATION_BLOCKS,
  reducers: {
    setValidatorConfirmationBlocks: setDataReducer<NodeConfirmationBlock[]>(),
    setValidatorConfirmationBlocksError: setErrorReducer(),
    unsetValidatorConfirmationBlocks: unsetDataReducer(),
  },
});

export const {
  setValidatorConfirmationBlocks,
  setValidatorConfirmationBlocksError,
  unsetValidatorConfirmationBlocks,
} = validatorConfirmationBlocks.actions;

export default validatorConfirmationBlocks;
