import {AccountNumber, AddressData, Balance, NodeIdentifier} from './network';

export interface AppNodeAddressData extends AddressData, NodeIdentifier {
  nickname: string;
}

export interface ManagedAccount extends AccountNumber, Balance {
  nickname: string;
  signing_key: string;
}

export interface ManagedFriend extends AccountNumber {
  nickname: string;
}

export interface ManagedNode extends AddressData {
  is_default?: boolean;
  nickname: string;
  nid_signing_key: string;
}
