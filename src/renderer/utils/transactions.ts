export const calculateTotalCost = (bankTxFee: string, points: number, validatorTxFee: string): number => {
  const floatBankTxFee = parseFloat(bankTxFee);
  const floatValidatorTxFee = parseFloat(validatorTxFee);
  return floatBankTxFee + floatValidatorTxFee + points;
};
