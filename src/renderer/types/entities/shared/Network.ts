import {ProtocolType} from '@renderer/types/api';

export default interface Network {
  ip_address: string;
  port: number | null;
  protocol: ProtocolType;
}
