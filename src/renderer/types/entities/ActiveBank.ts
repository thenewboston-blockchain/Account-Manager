import {NodeType} from '@renderer/types/api';
import Node from './Node';

export default interface ActiveBank extends Node {
  account_number: string;
  default_transaction_fee: string;
  node_identifier: string;
  node_type: NodeType.bank;
  version: string;
}
