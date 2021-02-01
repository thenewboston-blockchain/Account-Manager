import {createSlice} from '@reduxjs/toolkit';

import {BANK_VALIDATOR_CONFIRMATION_SERVICES} from '@renderer/constants/actions';
import {DictWithPaginatedResultsAndError, ValidatorConfirmationService} from '@renderer/types';
import {setPaginatedResultErrorReducer, setPaginatedResultReducer, unsetDataReducer} from '@renderer/utils/store';

const bankValidatorConfirmationServices = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<ValidatorConfirmationService>,
  name: BANK_VALIDATOR_CONFIRMATION_SERVICES,
  reducers: {
    setBankValidatorConfirmationServices: setPaginatedResultReducer<ValidatorConfirmationService>(),
    setBankValidatorConfirmationServicesError: setPaginatedResultErrorReducer(),
    unsetBankValidatorConfirmationServices: unsetDataReducer(),
  },
});

export const {
  setBankValidatorConfirmationServices,
  setBankValidatorConfirmationServicesError,
  unsetBankValidatorConfirmationServices,
} = bankValidatorConfirmationServices.actions;

export default bankValidatorConfirmationServices.reducer;
