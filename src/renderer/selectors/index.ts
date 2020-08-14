import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '@renderer/types';
import {formatAddressFromNode} from '@renderer/utils/address';

export const getActiveBank = (state: RootState) => state.app.activeBank;
export const getActivePrimaryValidator = (state: RootState) => state.app.activePrimaryValidator;
export const getManagedAccounts = (state: RootState) => state.app.managedAccounts;

export const getBankAccounts = (state: RootState) => state.banks.accounts;
export const getBankBanks = (state: RootState) => state.banks.banks;
export const getBankBankTransactions = (state: RootState) => state.banks.bank_transactions;
export const getBankBlocks = (state: RootState) => state.banks.blocks;
export const getBankConfigs = (state: RootState) => state.banks.configs;
export const getBankConfirmationBlocks = (state: RootState) => state.banks.confirmation_blocks;
export const getBankInvalidBlocks = (state: RootState) => state.banks.invalid_blocks;
export const getBankValidatorConfirmationServices = (state: RootState) => state.banks.validator_confirmation_services;
export const getBankValidators = (state: RootState) => state.banks.validators;

export const getValidatorAccounts = (state: RootState) => state.validators.accounts;
export const getValidatorBanks = (state: RootState) => state.validators.banks;
export const getValidatorConfigs = (state: RootState) => state.validators.configs;
export const getValidatorValidators = (state: RootState) => state.validators.validators;

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
