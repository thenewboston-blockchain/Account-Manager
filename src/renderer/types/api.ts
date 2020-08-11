export interface AddressData {
  ip_address: string;
  port: number | null;
  protocol: ProtocolType;
}

interface BlockMessage {
  balance_key: string;
  txs: Tx[];
}

interface BlockRequest {
  account_number: string;
  message: BlockMessage;
  signature: string;
}

export interface ConfirmationBlockMessage {
  block: BlockRequest;
  block_identifier: string;
  updated_balances: UpdatedBalance[];
}

export interface CreatedModified {
  created_date: string;
  modified_date: string;
}

export interface Id {
  id: string;
}

export type NodeAddressData = AddressData & NodeIdentifier;

export interface NodeIdentifier {
  node_identifier: string;
}

export enum NodeType {
  bank = 'BANK',
  confirmationValidator = 'CONFIRMATION_VALIDATOR',
  primaryValidator = 'PRIMARY_VALIDATOR',
}

export interface PaginatedResults<T> {
  count: number | null;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type ProtocolType = 'http' | 'https';

interface Tx {
  amount: string;
  recipient: string;
}

interface UpdatedBalance {
  account_number: string;
  balance: string;
  balance_lock?: string;
}
