import {BankConfig, ValidatorConfig} from '@renderer/types';

export const getBankTxFee = (activeBankConfig: BankConfig, senderAccountNumber: string): number => {
  if (activeBankConfig.account_number === senderAccountNumber) return 0;
  return parseFloat(activeBankConfig.default_transaction_fee);
};

export const getPrimaryValidatorTxFee = (
  activePrimaryValidatorConfig: ValidatorConfig,
  senderAccountNumber: string,
): number => {
  if (activePrimaryValidatorConfig.account_number === senderAccountNumber) return 0;
  return parseFloat(activePrimaryValidatorConfig.default_transaction_fee);
};
