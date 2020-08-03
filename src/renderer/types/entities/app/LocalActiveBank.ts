import {ProtocolType} from '@renderer/types/api';

export default interface LocalActiveBank {
  ip_address: string;
  nickname: string;
  port: number | null;
  protocol: ProtocolType;
}
