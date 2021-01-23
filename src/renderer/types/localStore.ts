import ElectronStore from 'electron-store';
import {ManagedAccount, ManagedFriend, ManagedNode} from './app';
import {Dict} from './store';

export interface LocalStore {
  managed_accounts: Dict<ManagedAccount>;
  managed_banks: Dict<ManagedNode>;
  managed_friends: Dict<ManagedFriend>;
  managed_validators: Dict<ManagedNode>;
  version: number;
}

export type AppElectronStore = ElectronStore<LocalStore>;
export type MigrationFunction = (localStore: AppElectronStore) => void;
