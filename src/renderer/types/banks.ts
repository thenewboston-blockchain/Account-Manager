import {CreatedModified, Id} from './network';

export interface BankAccount extends Id, CreatedModified {
  account_number: string;
  trust: string;
}

export interface BankConfirmationBlock extends Id, CreatedModified {
  block_identifier: string;
  block: string;
  validator: string;
}
