import {NodeType} from '@renderer/types/api';
import Node from '../shared/Node';

export default interface SessionBank extends Node {
  account_number: string;
  default_transaction_fee: string;
  node_identifier: string;
  node_type: NodeType.bank;
  version: string;
}
