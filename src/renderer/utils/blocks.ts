import axios from 'axios';

import {BankConfig, Tx, ValidatorConfig} from '@renderer/types';
import {formatAddress} from '@renderer/utils/address';
import {generateBlock, getKeyPairFromSigningKeyHex} from '@renderer/utils/signing';
import {getBankTxFee, getPrimaryValidatorTxFee} from '@renderer/utils/transactions';
import {AXIOS_TIMEOUT_MS} from '@renderer/config';

const createBlock = async (
  activePrimaryValidator: ValidatorConfig,
  senderSigningKey: string,
  recipientAccountNumber: string,
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
  activeBank: BankConfig,
  activePrimaryValidator: ValidatorConfig,
  coins: number,
  senderSigningKey: string,
  recipientAccountNumber: string,
  senderAccountNumber: string,
): Promise<void> => {
  const recipientIsActiveBank = recipientAccountNumber === activeBank.account_number;
  const recipientIsActivePrimaryValidator = recipientAccountNumber === activePrimaryValidator.account_number;

  const bankTxFee = getBankTxFee(activeBank, senderAccountNumber);
  const primaryValidatorTxFee = getPrimaryValidatorTxFee(activePrimaryValidator, senderAccountNumber);

  let txs: Tx[] = [
    {
      amount:
        coins +
        (recipientIsActiveBank ? bankTxFee : 0) +
        (recipientIsActivePrimaryValidator ? primaryValidatorTxFee : 0),
      recipient: recipientAccountNumber,
    },
  ];

  if (!recipientIsActiveBank) {
    txs.push({
      amount: bankTxFee,
      recipient: activeBank.account_number,
    });
  }

  if (!recipientIsActivePrimaryValidator) {
    txs.push({
      amount: primaryValidatorTxFee,
      recipient: activePrimaryValidator.account_number,
    });
  }

  txs = txs.filter((tx) => !!tx.amount);

  const {ip_address: ipAddress, port, protocol} = activeBank;
  const address = formatAddress(ipAddress, port, protocol);

  const block = await createBlock(
    activePrimaryValidator,
    senderSigningKey,
    recipientAccountNumber,
    senderAccountNumber,
    txs,
  );
  await axios.post(`${address}/blocks`, block, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
