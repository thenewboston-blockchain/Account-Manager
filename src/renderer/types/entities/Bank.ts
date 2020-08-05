import {NodeType, ProtocolType} from '@renderer/types/api';

export default interface Bank {
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
