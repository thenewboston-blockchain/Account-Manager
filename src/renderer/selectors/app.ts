import {createSelector} from '@reduxjs/toolkit';
import {formatAddressFromNode} from '@renderer/utils/address';
import {getBankConfigs, getManagedBanks, getManagedValidators, getValidatorConfigs} from './state';

export const getActiveBank = createSelector([getManagedBanks], (managedBanks) => {
  return Object.values(managedBanks).find((bank) => bank.is_default) || null;
});

export const getActiveBankConfig = createSelector([getActiveBank, getBankConfigs], (activeBank, bankConfigs) => {
  if (!activeBank) return null;
  const address = formatAddressFromNode(activeBank);
  return bankConfigs[address]?.data || null;
});

export const getActivePrimaryValidator = createSelector([getManagedValidators], (managedValidators) => {
  return Object.values(managedValidators).find((bank) => bank.is_default) || null;
});

export const getActivePrimaryValidatorConfig = createSelector(
  [getActivePrimaryValidator, getValidatorConfigs],
  (activePrimaryValidator, validatorConfigs) => {
    if (!activePrimaryValidator) return null;
    const address = formatAddressFromNode(activePrimaryValidator);
    return validatorConfigs[address]?.data || null;
  },
);
