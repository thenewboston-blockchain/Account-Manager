import {createSelector} from '@reduxjs/toolkit';
import {formatAddressFromNode} from '@renderer/utils/address';
import {BankConfig} from '@renderer/types';
import {
  getBankConfigs,
  getManagedAccountBalances,
  getManagedBanks,
  getManagedValidators,
  getValidatorConfigs,
} from './state';

export const getActiveBank = createSelector([getManagedBanks], (managedBanks) => {
  return Object.values(managedBanks).find((bank) => bank.is_default) || null;
});

export const getActiveBankConfig = createSelector(
  [getActiveBank, getBankConfigs],
  (activeBank, bankConfigs): BankConfig | null => {
    if (!activeBank) return null;
    const address = formatAddressFromNode(activeBank);
    return bankConfigs[address]?.data || null;
  },
);

export const getCoinBalance = createSelector([getManagedAccountBalances], (managedAccountBalances) => {
  return Object.values(managedAccountBalances).reduce((acc, account) => acc + account.balance, 0);
});

export const getPrimaryValidator = createSelector([getManagedValidators], (managedValidators) => {
  return Object.values(managedValidators).find((validator) => validator.is_default) || null;
});

export const getPrimaryValidatorConfig = createSelector(
  [getPrimaryValidator, getValidatorConfigs],
  (activePrimaryValidator, validatorConfigs) => {
    if (!activePrimaryValidator) return null;
    const address = formatAddressFromNode(activePrimaryValidator);
    return validatorConfigs[address]?.data || null;
  },
);
