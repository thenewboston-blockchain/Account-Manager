import {ConfirmationBlockMessage, Id} from './api';

export interface ValidatorAccount extends Id {
  account_number: string;
  balance: string;
  balance_lock: string;
}

export interface ValidatorConfirmationBlock {
  message: ConfirmationBlockMessage;
  node_identifier: string;
  signature: string;
}
