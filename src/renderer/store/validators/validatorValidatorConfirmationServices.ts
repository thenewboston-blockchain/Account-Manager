import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_VALIDATOR_CONFIRMATION_SERVICES} from '@renderer/constants';
import {DictWithPaginatedResultsAndError, ValidatorConfirmationService} from '@renderer/types';
import {unsetDataReducer, setPaginatedResultReducer, setPaginatedResultErrorReducer} from '@renderer/utils/store';

const validatorValidatorConfirmationServices = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<ValidatorConfirmationService>,
  name: VALIDATOR_VALIDATOR_CONFIRMATION_SERVICES,
  reducers: {
    setValidatorValidatorConfirmationServices: setPaginatedResultReducer<ValidatorConfirmationService>(),
    setValidatorValidatorConfirmationServicesError: setPaginatedResultErrorReducer(),
    unsetValidatorValidatorConfirmationServices: unsetDataReducer(),
  },
});

export const {
  setValidatorValidatorConfirmationServices,
  setValidatorValidatorConfirmationServicesError,
  unsetValidatorValidatorConfirmationServices,
} = validatorValidatorConfirmationServices.actions;

export default validatorValidatorConfirmationServices;
