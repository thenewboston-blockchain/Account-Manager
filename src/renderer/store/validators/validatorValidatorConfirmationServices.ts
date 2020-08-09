import {createSlice} from '@reduxjs/toolkit';

import {VALIDATOR_VALIDATOR_CONFIRMATION_SERVICES} from '@renderer/constants/store';
import {NodeValidatorConfirmationService} from '@renderer/types/entities';
import {DataWithError} from '@renderer/types/store';
import {setDataReducer, setErrorReducer, unsetDataReducer} from '@renderer/utils/store';

const validatorValidatorConfirmationServices = createSlice({
  initialState: {} as DataWithError<NodeValidatorConfirmationService[]>,
  name: VALIDATOR_VALIDATOR_CONFIRMATION_SERVICES,
  reducers: {
    setValidatorValidatorConfirmationServices: setDataReducer<NodeValidatorConfirmationService[]>(),
    setValidatorValidatorConfirmationServicesError: setErrorReducer(),
    unsetValidatorValidatorConfirmationServices: unsetDataReducer(),
  },
});

export const {
  setValidatorValidatorConfirmationServices,
  setValidatorValidatorConfirmationServicesError,
  unsetValidatorValidatorConfirmationServices,
} = validatorValidatorConfirmationServices.actions;

export default validatorValidatorConfirmationServices;
