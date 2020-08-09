import {AddressData} from '@renderer/types/entities';

export const formatAddress = (ipAddress: string, port: number | string | null, protocol: string): string => {
  const portNumber = Number(port);
  const formattedPort = portNumber && portNumber !== 80 ? `:${port}` : '';
  return `${protocol}://${ipAddress}${formattedPort}`;
};

export const formatAddressFromNode = (node: AddressData): string => {
  return formatAddress(node.ip_address, node.port, node.protocol);
};

export const formatPath = (ipAddress: string, port: number | string | null, protocol: string): string => {
  return `${protocol}/${ipAddress}/${port ?? 'port'}`;
};

export const formatPathFromNode = (node: AddressData): string => {
  return formatPath(node.ip_address, node.port, node.protocol);
};
