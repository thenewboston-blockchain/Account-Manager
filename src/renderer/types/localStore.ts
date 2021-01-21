import {ManagedAccount, ManagedFriend, ManagedNode} from './app';
import {Dict} from './store';

export interface LocalStore {
  managed_accounts: Dict<ManagedAccount>;
  managed_banks: Dict<ManagedNode>;
  managed_friends: Dict<ManagedFriend>;
  managed_validators: Dict<ManagedNode>;
  version: number;
}
