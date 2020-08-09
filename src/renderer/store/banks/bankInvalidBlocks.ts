import {createSlice} from '@reduxjs/toolkit';

import {BANK_INVALID_BLOCKS} from '@renderer/constants/store';
import {NodeInvalidBlock} from '@renderer/types/entities';
import {DataWithError} from '@renderer/types/store';
import {setDataReducer, setErrorReducer, unsetDataReducer} from '@renderer/utils/store';

const bankInvalidBlocks = createSlice({
  initialState: {} as DataWithError<NodeInvalidBlock[]>,
  name: BANK_INVALID_BLOCKS,
  reducers: {
    setBankInvalidBlocks: setDataReducer<NodeInvalidBlock[]>(),
    setBankInvalidBlocksError: setErrorReducer(),
    unsetBankInvalidBlocks: unsetDataReducer(),
  },
});

export const {setBankInvalidBlocks, setBankInvalidBlocksError, unsetBankInvalidBlocks} = bankInvalidBlocks.actions;

export default bankInvalidBlocks;
