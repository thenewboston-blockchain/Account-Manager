import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '@renderer/types/store';
import {formatAddressFromNode} from '@renderer/utils/address';

export const getActiveBank = (state: RootState) => state.app.activeBank;
export const getActivePrimaryValidator = (state: RootState) => state.app.activePrimaryValidator;

export const getBankAccounts = (state: RootState) => state.banks.accounts;
export const getBankConfigs = (state: RootState) => state.banks.configs;

export const getValidatorAccounts = (state: RootState) => state.validators.accounts;
export const getValidatorConfigs = (state: RootState) => state.validators.configs;

export const getActiveBankConfig = createSelector([getActiveBank, getBankConfigs], (activeBank, bankConfigs) => {
  if (!activeBank) return null;
  const address = formatAddressFromNode(activeBank);
  return bankConfigs[address]?.data || null;
});

export const getActivePrimaryValidatorConfig = createSelector(
  [getActivePrimaryValidator, getValidatorConfigs],
  (activePrimaryValidator, validatorConfigs) => {
    if (!activePrimaryValidator) return null;
    const address = formatAddressFromNode(activePrimaryValidator);
    return validatorConfigs[address]?.data || null;
  },
);
