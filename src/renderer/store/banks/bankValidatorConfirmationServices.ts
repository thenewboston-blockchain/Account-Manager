import {createSlice} from '@reduxjs/toolkit';

import {BANK_VALIDATOR_CONFIRMATION_SERVICES} from '@renderer/constants/store';
import {NodeValidatorConfirmationService} from '@renderer/types/entities';
import {DataWithError} from '@renderer/types/store';
import {setDataReducer, setErrorReducer, unsetDataReducer} from '@renderer/utils/store';

const bankValidatorConfirmationServices = createSlice({
  initialState: {} as DataWithError<NodeValidatorConfirmationService[]>,
  name: BANK_VALIDATOR_CONFIRMATION_SERVICES,
  reducers: {
    setBankValidatorConfirmationServices: setDataReducer<NodeValidatorConfirmationService[]>(),
    setBankValidatorConfirmationServicesError: setErrorReducer(),
    unsetBankValidatorConfirmationServices: unsetDataReducer(),
  },
});

export const {
  setBankValidatorConfirmationServices,
  setBankValidatorConfirmationServicesError,
  unsetBankValidatorConfirmationServices,
} = bankValidatorConfirmationServices.actions;

export default bankValidatorConfirmationServices;
