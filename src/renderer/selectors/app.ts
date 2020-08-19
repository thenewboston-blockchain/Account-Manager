import {createSelector} from '@reduxjs/toolkit';
import {formatAddressFromNode} from '@renderer/utils/address';
import {getActiveBank, getActivePrimaryValidator, getBankConfigs, getValidatorConfigs} from './state';

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
