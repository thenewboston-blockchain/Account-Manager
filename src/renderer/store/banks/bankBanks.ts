import {createSlice} from '@reduxjs/toolkit';

import {BANK_BANKS} from '@renderer/constants/store';
import {NetworkNode} from '@renderer/types/entities';
import {DataWithError} from '@renderer/types/store';
import {setDataReducer, setErrorReducer, unsetDataReducer} from '@renderer/utils/store';

const bankBanks = createSlice({
  initialState: {} as DataWithError<NetworkNode[]>,
  name: BANK_BANKS,
  reducers: {
    setBankBanks: setDataReducer<NetworkNode[]>(),
    setBankBanksError: setErrorReducer(),
    unsetBankBanks: unsetDataReducer(),
  },
});

export const {setBankBanks, setBankBanksError, unsetBankBanks} = bankBanks.actions;

export default bankBanks;
