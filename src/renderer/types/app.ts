import {AccountNumber, AddressData, NodeIdentifier} from './network';

export interface AppNodeAddressData extends AddressData, NodeIdentifier {
  nickname: string;
}

export interface ManagedAccount extends AccountNumber {
  balance: string;
  nickname: string;
  signing_key: string;
}

export interface ManagedFriend extends AccountNumber {
  nickname: string;
}

export interface ManagedNode extends AddressData {
  isActive?: boolean;
  nickname: string;
  signing_key: string;
}
