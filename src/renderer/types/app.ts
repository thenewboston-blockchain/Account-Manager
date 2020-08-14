import {NodeType, ProtocolType} from './constants';
import {AccountNumber, AddressData, NodeIdentifier} from './network';

export interface AppNodeAddressData extends AddressData, NodeIdentifier {
  nickname: string;
}

export interface ManagedAccount extends AccountNumber {
  balance: string;
  nickname: string;
  signing_key: string;
}

export interface ManagedFriend extends AccountNumber {
  nickname: string;
}

export interface OldBank extends AccountNumber {
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

export interface OldValidator extends AccountNumber {
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
