import {NodeType} from '@renderer/types/api';
import Node from '../shared/Node';

export default interface BankConfig extends Node {
  account_number: string;
  default_transaction_fee: string;
  node_identifier: string;
  node_type: NodeType.bank;
  primary_validator: Node; // TODO: This needs updating
  version: string;
}
