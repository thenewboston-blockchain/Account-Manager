import {ProtocolType} from '@renderer/types/network';

export interface AccountNumberParams {
  accountNumber: string;
}

export interface AddressParams {
  ipAddress: string;
  port: string;
  protocol: ProtocolType;
}
