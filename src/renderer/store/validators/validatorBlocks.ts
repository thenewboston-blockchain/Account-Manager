import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_BLOCKS} from '@renderer/constants/store';
import {NodeBlock} from '@renderer/types/entities';
import {DictWithPaginatedResultsAndError} from '@renderer/types/store';
import {unsetDataReducer, setPaginatedResultReducer, setPaginatedResultErrorReducer} from '@renderer/utils/store';

const validatorBlocks = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<NodeBlock>,
  name: VALIDATOR_BLOCKS,
  reducers: {
    setValidatorBlocks: setPaginatedResultReducer<NodeBlock>(),
    setValidatorBlocksError: setPaginatedResultErrorReducer(),
    unsetValidatorBlocks: unsetDataReducer(),
  },
});

export const {setValidatorBlocks, setValidatorBlocksError, unsetValidatorBlocks} = validatorBlocks.actions;

export default validatorBlocks;
