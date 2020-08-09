import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_BLOCKS} from '@renderer/constants/store';
import {NodeBlock} from '@renderer/types/entities';
import {DataWithError} from '@renderer/types/store';
import {setDataReducer, setErrorReducer, unsetDataReducer} from '@renderer/utils/store';

const validatorBlocks = createSlice({
  initialState: {} as DataWithError<NodeBlock[]>,
  name: VALIDATOR_BLOCKS,
  reducers: {
    setValidatorBlocks: setDataReducer<NodeBlock[]>(),
    setValidatorBlocksError: setErrorReducer(),
    unsetValidatorBlocks: unsetDataReducer(),
  },
});

export const {setValidatorBlocks, setValidatorBlocksError, unsetValidatorBlocks} = validatorBlocks.actions;

export default validatorBlocks;
