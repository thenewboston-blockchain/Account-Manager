import {NodeType, ProtocolType} from './constants';

export interface AddressData {
  ip_address: string;
  port: number | null;
  protocol: ProtocolType;
}

export interface BankAccount extends Id, CreatedModified {
  account_number: string;
  trust: string;
}

export interface BankConfig extends Node {
  node_type: NodeType.bank;
  primary_validator: PrimaryValidatorConfig;
}

export interface BankConfirmationBlock extends Id, CreatedModified {
  block_identifier: string;
  block: string;
  validator: string;
}

export interface BankTransaction extends Id {
  block: BlockResponse;
  amount: string;
  recipient: string;
}

export interface BaseValidator extends Node {
  root_account_file: string;
  root_account_file_hash: string;
  seed_block_identifier: string;
  daily_confirmation_rate: string | null;
}

interface BlockMessage {
  balance_key: string;
  txs: Tx[];
}

interface BlockRequest {
  account_number: string;
  message: BlockMessage;
  signature: string;
}

export interface BlockResponse extends Id, CreatedModified {
  balance_key: string;
  sender: string;
  signature: string;
}

export interface ConfirmationBlockMessage {
  block: BlockRequest;
  block_identifier: string;
  updated_balances: UpdatedBalance[];
}

export interface CreatedModified {
  created_date: string;
  modified_date: string;
}

export interface Id {
  id: string;
}

export interface InvalidBlock extends Id, CreatedModified {
  block_identifier: string;
  block: string;
  confirmation_validator: string;
  primary_validator: string;
}

export interface Node extends AddressData, NodeIdentifier {
  account_number: string;
  default_transaction_fee: string;
  node_type: NodeType;
  trust: string;
  version: string;
}

export interface NodeIdentifier {
  node_identifier: string;
}

export interface PaginatedResults<T> {
  count: number | null;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface PrimaryValidatorConfig extends BaseValidator {
  node_type: NodeType.primaryValidator;
}

export interface Tx {
  amount: number | string;
  recipient: string;
}

interface UpdatedBalance {
  account_number: string;
  balance: string;
  balance_lock?: string;
}

export interface ValidatorAccount extends Id {
  account_number: string;
  balance: string;
  balance_lock: string;
}

export interface ValidatorConfig extends BaseValidator {
  node_type: NodeType.primaryValidator | NodeType.confirmationValidator;
}

export interface ValidatorConfirmationBlock {
  message: ConfirmationBlockMessage;
  node_identifier: string;
  signature: string;
}

export interface ValidatorConfirmationService extends Id, CreatedModified {
  end: string;
  start: string;
  validator: string;
}
