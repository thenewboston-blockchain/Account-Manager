import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_BANKS} from '@renderer/constants';
import {DictWithPaginatedResultsAndError, NetworkNode} from '@renderer/types';
import {unsetDataReducer, setPaginatedResultReducer, setPaginatedResultErrorReducer} from '@renderer/utils/store';

const validatorBanks = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<NetworkNode>,
  name: VALIDATOR_BANKS,
  reducers: {
    setValidatorBanks: setPaginatedResultReducer<NetworkNode>(),
    setValidatorBanksError: setPaginatedResultErrorReducer(),
    unsetValidatorBanks: unsetDataReducer(),
  },
});

export const {setValidatorBanks, setValidatorBanksError, unsetValidatorBanks} = validatorBanks.actions;

export default validatorBanks;
