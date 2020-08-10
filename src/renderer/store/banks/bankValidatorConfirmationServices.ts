import {createSlice} from '@reduxjs/toolkit';

import {BANK_VALIDATOR_CONFIRMATION_SERVICES} from '@renderer/constants/store';
import {NodeValidatorConfirmationService} from '@renderer/types/entities';
import {DictWithPaginatedResultsAndError} from '@renderer/types/store';
import {unsetDataReducer, setPaginatedResultReducer, setPaginatedResultErrorReducer} from '@renderer/utils/store';

const bankValidatorConfirmationServices = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<NodeValidatorConfirmationService>,
  name: BANK_VALIDATOR_CONFIRMATION_SERVICES,
  reducers: {
    setBankValidatorConfirmationServices: setPaginatedResultReducer<NodeValidatorConfirmationService>(),
    setBankValidatorConfirmationServicesError: setPaginatedResultErrorReducer(),
    unsetBankValidatorConfirmationServices: unsetDataReducer(),
  },
});

export const {
  setBankValidatorConfirmationServices,
  setBankValidatorConfirmationServicesError,
  unsetBankValidatorConfirmationServices,
} = bankValidatorConfirmationServices.actions;

export default bankValidatorConfirmationServices;
