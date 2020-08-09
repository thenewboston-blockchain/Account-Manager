import {createSlice} from '@reduxjs/toolkit';

import {BANK_BLOCKS} from '@renderer/constants/store';
import {NodeBlock} from '@renderer/types/entities';
import {DataWithError} from '@renderer/types/store';
import {setDataReducer, setErrorReducer, unsetDataReducer} from '@renderer/utils/store';

const bankBlocks = createSlice({
  initialState: {} as DataWithError<NodeBlock[]>,
  name: BANK_BLOCKS,
  reducers: {
    setBankBlocks: setDataReducer<NodeBlock[]>(),
    setBankBlocksError: setErrorReducer(),
    unsetBankBlocks: unsetDataReducer(),
  },
});

export const {setBankBlocks, setBankBlocksError, unsetBankBlocks} = bankBlocks.actions;

export default bankBlocks;
