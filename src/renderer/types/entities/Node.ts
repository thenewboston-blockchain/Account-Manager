import {ProtocolType} from '@renderer/types/api';

export default interface Node {
  ip_address: string;
  port: number | null;
  protocol: ProtocolType;
  node_identifier: string;
}
