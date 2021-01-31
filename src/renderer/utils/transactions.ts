import {BankConfig, ValidatorConfig} from '@renderer/types';

export const getBankTxFee = (activeBankConfig: BankConfig, senderAccountNumber?: string): number => {
  if (senderAccountNumber && activeBankConfig.account_number === senderAccountNumber) return 0;
  return activeBankConfig.default_transaction_fee;
};

export const getPrimaryValidatorTxFee = (
  primaryValidatorConfig: ValidatorConfig,
  senderAccountNumber: string,
): number => {
  if (primaryValidatorConfig.account_number === senderAccountNumber) return 0;
  return primaryValidatorConfig.default_transaction_fee;
};
