import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_VALIDATOR_CONFIRMATION_SERVICES} from '@renderer/constants/store';
import {NodeValidatorConfirmationService} from '@renderer/types/entities';
import {DictWithPaginatedResultsAndError} from '@renderer/types/store';
import {unsetDataReducer, setPaginatedResultReducer, setPaginatedResultErrorReducer} from '@renderer/utils/store';

const validatorValidatorConfirmationServices = createSlice({
  initialState: {} as DictWithPaginatedResultsAndError<NodeValidatorConfirmationService>,
  name: VALIDATOR_VALIDATOR_CONFIRMATION_SERVICES,
  reducers: {
    setValidatorValidatorConfirmationServices: setPaginatedResultReducer<NodeValidatorConfirmationService>(),
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
