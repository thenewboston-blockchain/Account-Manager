import {NodeType, ProtocolType} from '@renderer/types/api';

export default interface Validator {
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
