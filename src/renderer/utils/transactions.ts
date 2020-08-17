interface TxAmounts {
  bankTxFee: string;
  points: number;
  validatorTxFee: string;
}

export const calculateTotalCost = ({bankTxFee, points, validatorTxFee}: TxAmounts): number => {
  const floatBankTxFee = parseFloat(bankTxFee);
  const floatValidatorTxFee = parseFloat(validatorTxFee);
  return floatBankTxFee + floatValidatorTxFee + points;
};
