import Node from './Node';

export default interface Bank extends Node {
  account_number: string;
  version: string;
  default_transaction_fee: string;
  node_identifier: string;
}
