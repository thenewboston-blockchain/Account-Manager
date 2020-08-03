import {ProtocolType} from '@renderer/types/api';

export default interface NetworkNode {
  ip_address: string;
  node_identifier: string;
  port: number | null;
  protocol: ProtocolType;
}
