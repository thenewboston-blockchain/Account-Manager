export type ProtocolType = 'http' | 'https';
export interface Bank {
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
