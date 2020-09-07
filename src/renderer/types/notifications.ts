export interface Tx {
  amount: number;
  recipient: string;
}

export interface Message2 {
  balance_key: string;
  txs: Tx[];
}

export interface Block {
  account_number: string;
  message: Message2;
  signature: string;
}

export interface UpdatedBalance {
  account_number: string;
  balance: string;
  balance_lock: string;
}

export interface Message {
  block: Block;
  block_identifier: string;
  updated_balances: UpdatedBalance[];
}

export interface ConfirmationBlock {
  message: Message;
  node_identifier: string;
  signature: string;
}

export interface Notification {
  notificationTime: number;
  notificationType: string;
  payload: ConfirmationBlock;
}

export interface NotificationDict {
  [key: number]: Notification;
}
