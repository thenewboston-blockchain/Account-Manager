import {ProtocolType} from '@renderer/types/api';

export default interface Bank {
  account_number: string;
  ip_address: string;
  node_identifier: string;
  port: number | null;
  protocol: ProtocolType;
  version: string;
  default_transaction_fee: string;
  trust: string;
  nickName?: string;
}
