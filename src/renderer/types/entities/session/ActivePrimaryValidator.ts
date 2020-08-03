import {NodeType} from '@renderer/types/api';
import Node from '../shared/Node';

export default interface ActivePrimaryValidator extends Node {
  account_number: string;
  node_identifier: string;
  version: string;
  default_transaction_fee: string;
  root_account_file: string;
  root_account_file_hash: string;
  seed_block_identifier: string;
  daily_confirmation_rate: string | null;
  node_type: NodeType.primaryValidator;
}
