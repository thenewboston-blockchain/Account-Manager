import {RootState} from '@renderer/types';

export const getManagedAccounts = (state: RootState) => state.app.managedAccounts;
export const getManagedBanks = (state: RootState) => state.app.managedBanks;
export const getManagedFriends = (state: RootState) => state.app.managedFriends;
export const getManagedValidators = (state: RootState) => state.app.managedValidators;

export const getBankAccounts = (state: RootState) => state.banks.accounts;
export const getBankBanks = (state: RootState) => state.banks.banks;
export const getBankBankTransactions = (state: RootState) => state.banks.bank_transactions;
export const getBankBlocks = (state: RootState) => state.banks.blocks;
export const getBankConfigs = (state: RootState) => state.banks.configs;
export const getBankConfirmationBlocks = (state: RootState) => state.banks.confirmation_blocks;
export const getBankInvalidBlocks = (state: RootState) => state.banks.invalid_blocks;
export const getBankValidatorConfirmationServices = (state: RootState) => state.banks.validator_confirmation_services;
export const getBankValidators = (state: RootState) => state.banks.validators;

export const getAccountBalances = (state: RootState) => state.accountBalances;
export const getManagedAccountBalances = (state: RootState) => state.managedAccountBalances;

export const getNotifications = (state: RootState) => state.notifications;

export const getCrawlSockets = (state: RootState) => state.sockets.crawl;
export const getCleanSockets = (state: RootState) => state.sockets.clean;

export const getValidatorAccounts = (state: RootState) => state.validators.accounts;
export const getValidatorBanks = (state: RootState) => state.validators.banks;
export const getValidatorConfigs = (state: RootState) => state.validators.configs;
export const getValidatorValidators = (state: RootState) => state.validators.validators;
