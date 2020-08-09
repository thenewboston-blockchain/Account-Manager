import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_INVALID_BLOCKS} from '@renderer/constants/store';
import {NodeInvalidBlock} from '@renderer/types/entities';
import {DataWithError} from '@renderer/types/store';
import {setDataReducer, setErrorReducer, unsetDataReducer} from '@renderer/utils/store';

const validatorInvalidBlocks = createSlice({
  initialState: {} as DataWithError<NodeInvalidBlock[]>,
  name: VALIDATOR_INVALID_BLOCKS,
  reducers: {
    setValidatorInvalidBlocks: setDataReducer<NodeInvalidBlock[]>(),
    setValidatorInvalidBlocksError: setErrorReducer(),
    unsetValidatorInvalidBlocks: unsetDataReducer(),
  },
});

export const {
  setValidatorInvalidBlocks,
  setValidatorInvalidBlocksError,
  unsetValidatorInvalidBlocks,
} = validatorInvalidBlocks.actions;

export default validatorInvalidBlocks;
