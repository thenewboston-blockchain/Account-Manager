import {NodeAddressData, NodeType, ProtocolType} from './api';

export interface AppNodeAddressData extends NodeAddressData {
  nickname: string;
}

export interface OldAccount {
  account_number: string;
  balance: string;
  balance_lock: string;
  id: string;
}

export interface OldBank {
  account_number: string;
  confirmation_expiration?: string | null;
  default_transaction_fee: string;
  ip_address: string;
  node_identifier: string;
  node_type: NodeType;
  port: number | null;
  protocol: ProtocolType;
  trust?: string;
  version: string;
}

export interface OldValidator {
  account_number: string;
  daily_confirmation_rate: string | null;
  default_transaction_fee: string;
  ip_address: string;
  node_identifier: string;
  node_type: NodeType;
  port: number | null;
  protocol: ProtocolType;
  root_account_file: string;
  root_account_file_hash: string;
  seed_block_identifier: string;
  trust?: string;
  version: string;
}
