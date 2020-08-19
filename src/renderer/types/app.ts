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

export interface ManagedNode extends AddressData {
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
