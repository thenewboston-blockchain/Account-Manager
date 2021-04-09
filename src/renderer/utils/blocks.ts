import axios from 'axios';
import {Account, PrimaryValidator} from 'thenewboston';

import {AcceptedFees, BankConfig, Tx, ValidatorConfig} from '@renderer/types';
import {formatAddress} from '@renderer/utils/address';
import {getBankTxFee, getPrimaryValidatorTxFee} from '@renderer/utils/transactions';

const fetchAccountBalanceLock = async (
  accountNumber: string,
  activePrimaryValidator: ValidatorConfig,
): Promise<string> => {
  const {ip_address: ipAddress, port, protocol} = activePrimaryValidator;
  const address = formatAddress(ipAddress, port, protocol);
  const validator = new PrimaryValidator(address);

  const {balance_lock: balanceLock} = await validator.getAccountBalanceLock(accountNumber);
  if (balanceLock) {
    return balanceLock;
  }
  throw new Error('Error: fetchAccountBalanceLock');
};

export const sendBlock = async (
  activeBankConfig: BankConfig,
  primaryValidatorConfig: ValidatorConfig,
  senderSigningKey: string,
  senderAccountNumber: string,
  recipients: Array<{accountNumber: string; amount: number}>,
): Promise<void> => {
  let recipientWasActiveBank = false;
  let recipientWasPv = false;

  const bankTxFee = getBankTxFee(activeBankConfig, senderAccountNumber);
  const primaryValidatorTxFee = getPrimaryValidatorTxFee(primaryValidatorConfig, senderAccountNumber);

  let txs: Tx[] = [];

  for (const recipient of recipients) {
    let {amount} = recipient;
    if (!recipientWasActiveBank && recipient.accountNumber === activeBankConfig.account_number) {
      amount += bankTxFee;
      recipientWasActiveBank = true;
    }
    if (!recipientWasPv && recipient.accountNumber === primaryValidatorConfig.account_number) {
      amount += primaryValidatorTxFee;
      recipientWasPv = true;
    }

    txs.push({amount, recipient: recipient.accountNumber});
  }

  if (!recipientWasActiveBank) {
    txs.push({
      amount: bankTxFee,
      fee: AcceptedFees.bank,
      recipient: activeBankConfig.account_number,
    });
  }

  if (!recipientWasPv) {
    txs.push({
      amount: primaryValidatorTxFee,
      fee: AcceptedFees.primaryValidator,
      recipient: primaryValidatorConfig.account_number,
    });
  }

  txs = txs.filter((tx) => !!tx.amount);

  const {ip_address: ipAddress, port, protocol} = activeBankConfig;
  const address = formatAddress(ipAddress, port, protocol);
  const sender = new Account(senderSigningKey);
  const balanceLock = await fetchAccountBalanceLock(senderAccountNumber, primaryValidatorConfig);
  const block = sender.createBlockMessage(balanceLock, txs);
  await axios.post(`${address}/blocks`, block, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
