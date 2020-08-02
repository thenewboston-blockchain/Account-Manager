import {ProtocolType} from '@renderer/types/api';

export default interface Node {
  account_number: string;
  default_transaction_fee: string;
  ip_address: string;
  node_identifier: string;
  node_type?: 'BANK' | 'CONFIRMATION_VALIDATOR' | 'PRIMARY_VALIDATOR';
  port: number | null;
  protocol: ProtocolType;
  version: string;
}
