import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_BANKS} from '@renderer/constants/store';
import {NetworkNode} from '@renderer/types/entities';
import {DataWithError} from '@renderer/types/store';
import {setDataReducer, setErrorReducer, unsetDataReducer} from '@renderer/utils/store';

const validatorBanks = createSlice({
  initialState: {} as DataWithError<NetworkNode[]>,
  name: VALIDATOR_BANKS,
  reducers: {
    setValidatorBanks: setDataReducer<NetworkNode[]>(),
    setValidatorBanksError: setErrorReducer(),
    unsetValidatorBanks: unsetDataReducer(),
  },
});

export const {setValidatorBanks, setValidatorBanksError, unsetValidatorBanks} = validatorBanks.actions;

export default validatorBanks;
