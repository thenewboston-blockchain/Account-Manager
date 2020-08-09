export enum NodeType {
  bank = 'BANK',
  confirmationValidator = 'CONFIRMATION_VALIDATOR',
  primaryValidator = 'PRIMARY_VALIDATOR',
}

export type ProtocolType = 'http' | 'https';

export interface PaginatedResult<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
