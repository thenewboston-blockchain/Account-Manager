export enum NodeType {
  bank = 'BANK',
  confirmationValidator = 'CONFIRMATION_VALIDATOR',
  primaryValidator = 'PRIMARY_VALIDATOR',
}

export type ProtocolType = 'http' | 'https';

export interface PaginatedResults<T> {
  count: number | null;
  next: string | null;
  previous: string | null;
  results: T[];
}
