import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_BANKS} from '@renderer/constants';
import {DictWithPaginatedResultsAndError, Node} from '@renderer/types';
import {setPaginatedResultErrorReducer, setPaginatedResultReducer, unsetDataReducer} from '@renderer/utils/store';

const validatorBanks = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<Node>,
  name: VALIDATOR_BANKS,
  reducers: {
    setValidatorBanks: setPaginatedResultReducer<Node>(),
    setValidatorBanksError: setPaginatedResultErrorReducer(),
    unsetValidatorBanks: unsetDataReducer(),
  },
});

export const {setValidatorBanks, setValidatorBanksError, unsetValidatorBanks} = validatorBanks.actions;

export default validatorBanks;
