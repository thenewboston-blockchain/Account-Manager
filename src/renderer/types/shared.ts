import {CreatedModified, Id, NodeAddressData, NodeType} from './api';

export interface BankConfig extends NetworkNode {
  node_type: NodeType.bank;
  primary_validator: PrimaryValidatorConfig;
}

export interface BankTransaction extends Id {
  block: BlockResponse;
  amount: string;
  recipient: string;
}

export interface BlockResponse extends Id, CreatedModified {
  balance_key: string;
  sender: string;
  signature: string;
}

export interface InvalidBlock extends Id, CreatedModified {
  block_identifier: string;
  block: string;
  confirmation_validator: string;
  primary_validator: string;
}

export interface NetworkNode extends NodeAddressData {
  account_number: string;
  default_transaction_fee: string;
  node_type: NodeType;
  trust: string;
  version: string;
}

export interface NetworkValidator extends NetworkNode {
  root_account_file: string;
  root_account_file_hash: string;
  seed_block_identifier: string;
  daily_confirmation_rate: string | null;
}

export interface PrimaryValidatorConfig extends NetworkValidator {
  node_type: NodeType.primaryValidator;
}

export interface ValidatorConfig extends NetworkValidator {
  node_type: NodeType.primaryValidator | NodeType.confirmationValidator;
}

export interface ValidatorConfirmationService extends Id, CreatedModified {
  end: string;
  start: string;
  validator: string;
}
