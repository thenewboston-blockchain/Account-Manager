import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '@renderer/types/store';

const getActiveBank = (state: RootState) => state.app.activeBank;
const getActivePrimaryValidator = (state: RootState) => state.app.activePrimaryValidator;
const getBankConfigs = (state: RootState) => state.configs.bankConfigs;
const getValidatorConfigs = (state: RootState) => state.configs.validatorConfigs;

export const getActiveBankConfig = createSelector([getActiveBank, getBankConfigs], (activeBank, bankConfigs) => {
  if (!activeBank) return null;
  return bankConfigs[activeBank.node_identifier] || null;
});

export const getActivePrimaryValidatorConfig = createSelector(
  [getActivePrimaryValidator, getValidatorConfigs],
  (activePrimaryValidator, validatorConfigs) => {
    if (!activePrimaryValidator) return null;
    return validatorConfigs[activePrimaryValidator.node_identifier] || null;
  },
);
