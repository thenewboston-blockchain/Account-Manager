import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_BLOCKS} from '@renderer/constants';
import {BlockResponse, DictWithPaginatedResultsAndError} from '@renderer/types';
import {unsetDataReducer, setPaginatedResultReducer, setPaginatedResultErrorReducer} from '@renderer/utils/store';

const validatorBlocks = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<BlockResponse>,
  name: VALIDATOR_BLOCKS,
  reducers: {
    setValidatorBlocks: setPaginatedResultReducer<BlockResponse>(),
    setValidatorBlocksError: setPaginatedResultErrorReducer(),
    unsetValidatorBlocks: unsetDataReducer(),
  },
});

export const {setValidatorBlocks, setValidatorBlocksError, unsetValidatorBlocks} = validatorBlocks.actions;

export default validatorBlocks;
