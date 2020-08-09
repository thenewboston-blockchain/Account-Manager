import store from '@renderer/store';
import {BankConfig, PrimaryValidatorConfig} from '@renderer/types/entities';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export interface Data<T> {
  [key: string]: T;
}

export type DataWithError<T> = Data<{error: string | null; data: T}>;

interface Account {
  id: string;
  created_date: string;
  modified_date: string;
  account_number: string;
  trust: number;
}

interface Block {
  id: string;
  created_date: string;
  modified_date: string;
  balance_key: string;
  sender: string;
  signature: string;
}

interface BankTransaction {
  id: string;
  block: Block;
  amount: string;
  recipient: string;
}

interface Bank {
  account_number: string;
  ip_address: string;
  node_identifier: string;
  port: number;
  protocol: string;
  version: string;
  default_transaction_fee: string;
  trust: string;
}

interface ConfirmationBlock {
  message: any; // TODO
  node_identifier: string;
  signature: string;
}

interface Validator {
  account_number: string;
  ip_address: string;
  node_identifier: string;
  port: number;
  protocol: string;
  version: string;
  default_transaction_fee: string;
  root_account_file: string;
  root_account_file_hash: string;
  seed_block_identifier: string;
  daily_confirmation_rate: string | null;
  trust: string;
}

interface BankBlock {
  block: Block;
  node_identifier: string;
  signature: string;
}

export enum BankKeys {
  accounts = 'accounts',
  bankTransactions = 'bank_transactions',
  banks = 'banks',
  blocks = 'blocks',
  config = 'config',
  confirmationBlocks = 'confirmation_blocks',
  validators = 'validators',
}

export interface BankData {
  error: {
    [BankKeys.accounts]?: string;
    [BankKeys.bankTransactions]?: string;
    [BankKeys.banks]?: string;
    [BankKeys.blocks]?: string;
    [BankKeys.config]?: string;
    [BankKeys.confirmationBlocks]?: string;
    [BankKeys.validators]?: string;
  };
  [BankKeys.accounts]?: Account[];
  [BankKeys.bankTransactions]?: BankTransaction[];
  [BankKeys.banks]?: Bank[];
  [BankKeys.blocks]?: Block[];
  [BankKeys.config]?: BankConfig;
  [BankKeys.confirmationBlocks]?: ConfirmationBlock[];
  [BankKeys.validators]?: Validator[];
}

export enum ValidatorKeys {
  accounts = 'accounts',
  bankBlocks = 'bank_blocks',
  banks = 'banks',
  config = 'config',
  confirmationBlocks = 'confirmation_blocks',
  validators = 'validators',
}

export interface ValidatorData {
  error: {
    [ValidatorKeys.accounts]?: string;
    [ValidatorKeys.bankBlocks]?: string;
    [ValidatorKeys.banks]?: string;
    [ValidatorKeys.config]?: string;
    [ValidatorKeys.confirmationBlocks]?: string;
    [ValidatorKeys.validators]?: string;
  };
  [ValidatorKeys.accounts]?: Account[];
  [ValidatorKeys.bankBlocks]?: BankBlock[];
  [ValidatorKeys.banks]?: Bank[];
  [ValidatorKeys.config]?: PrimaryValidatorConfig;
  [ValidatorKeys.confirmationBlocks]?: ConfirmationBlock[];
  [ValidatorKeys.validators]?: Validator[];
}
