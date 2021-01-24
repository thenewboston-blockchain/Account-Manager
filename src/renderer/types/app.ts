import {AccountNumber, AddressData, NodeIdentifier} from './network';

export enum AccountType {
  'managedAccount' = 'managedAccount',
  'managedFriend' = 'managedFriend',
}

export type AddressDataWithNickname = AddressData & Nickname;

export type AppNodeAddressData = AddressDataWithNickname & NodeIdentifier;

export interface ManagedAccount extends AccountNumber, Nickname {
  signing_key: string;
}

export type ManagedFriend = AccountNumber & Nickname;

export interface ManagedNode extends AddressData, Nickname {
  account_signing_key: string;
  is_default?: boolean;
  nid_signing_key: string;
}

export interface Nickname {
  nickname: string;
}
