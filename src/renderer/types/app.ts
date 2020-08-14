import {NodeType, ProtocolType} from './constants';
import {AddressData, NodeIdentifier} from './network';

export interface AppNodeAddressData extends AddressData, NodeIdentifier {
  nickname: string;
}

export interface ManagedAccount {
  account_number: string;
  balance: string;
  nickname: string;
  signing_key: string;
}

export interface ManagedFriend {
  account_number: string;
  nickname: string;
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
