import axios from 'axios';

import {BankConfig, Tx, ValidatorConfig} from '@renderer/types';
import {formatAddress} from '@renderer/utils/address';
import {generateBlock, getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import {getBankTxFee, getPrimaryValidatorTxFee} from '@renderer/utils/transactions';
import {AXIOS_TIMEOUT_MS} from '@renderer/config';

const createBlock = async (
  activePrimaryValidator: ValidatorConfig,
  senderSigningKey: string,
  senderAccountNumber: string,
  txs: Tx[],
): Promise<string> => {
  const {publicKeyHex, signingKey} = getKeyPairFromSigningKeyHex(senderSigningKey);
  const balanceLock = await fetchAccountBalanceLock(senderAccountNumber, activePrimaryValidator);
  return generateBlock(balanceLock, publicKeyHex, signingKey, txs);
};

const fetchAccountBalanceLock = async (
  accountNumber: string,
  activePrimaryValidator: ValidatorConfig,
): Promise<string> => {
  const {ip_address: ipAddress, port, protocol} = activePrimaryValidator;
  const address = formatAddress(ipAddress, port, protocol);
  const {
    data: {balance_lock: balanceLock},
  } = await axios.get(`${address}/accounts/${accountNumber}/balance_lock`, {timeout: AXIOS_TIMEOUT_MS});
  return balanceLock;
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
      recipient: activeBankConfig.account_number,
    });
  }

  if (!recipientWasPv) {
    txs.push({
      amount: primaryValidatorTxFee,
      recipient: primaryValidatorConfig.account_number,
    });
  }

  txs = txs.filter((tx) => !!tx.amount);

  const {ip_address: ipAddress, port, protocol} = activeBankConfig;
  const address = formatAddress(ipAddress, port, protocol);

  const block = await createBlock(primaryValidatorConfig, senderSigningKey, senderAccountNumber, txs);
  await axios.post(`${address}/blocks`, block, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
