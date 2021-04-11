import {Account, AccountPaymentHandler, PrimaryValidator} from 'thenewboston';

import {BankConfig, ValidatorConfig} from '@renderer/types';
import {formatAddress} from '@renderer/utils/address';

export const fetchAccountBalanceLock = async (
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
  senderSigningKey: string,
  transactions: Array<{amount: number; recipient: string}>,
): Promise<void> => {
  const {ip_address: ipAddress, port, protocol} = activeBankConfig;
  const bankUrl = formatAddress(ipAddress, port, protocol);
  const sender = new Account(senderSigningKey);

  const paymentHandler = new AccountPaymentHandler({account: sender, bankUrl});

  // configue the payment handler
  // Get transacations and set PV
  await paymentHandler.init();

  paymentHandler.sendBulkTransactions(transactions);
};
