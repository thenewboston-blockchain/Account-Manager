import {createSlice} from '@reduxjs/toolkit';

import {BANK_CONFIRMATION_BLOCKS} from '@renderer/constants/store';
import {NodeConfirmationBlock} from '@renderer/types/entities';
import {DataWithError} from '@renderer/types/store';
import {setDataReducer, setErrorReducer, unsetDataReducer} from '@renderer/utils/store';

const bankConfirmationBlocks = createSlice({
  initialState: {} as DataWithError<NodeConfirmationBlock[]>,
  name: BANK_CONFIRMATION_BLOCKS,
  reducers: {
    setBankConfirmationBlocks: setDataReducer<NodeConfirmationBlock[]>(),
    setBankConfirmationBlocksError: setErrorReducer(),
    unsetBankConfirmationBlocks: unsetDataReducer(),
  },
});

export const {
  setBankConfirmationBlocks,
  setBankConfirmationBlocksError,
  unsetBankConfirmationBlocks,
} = bankConfirmationBlocks.actions;

export default bankConfirmationBlocks;
