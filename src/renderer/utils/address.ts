import {parse, ParsedUrlQuery, stringify} from 'querystring';
import {AddressData, ProtocolType} from '@renderer/types';

export const formatAddress = (ipAddress: string, port: number | string, protocol: string): string => {
  return `${protocol}://${ipAddress}:${port}`;
};

export const formatAddressFromNode = (node: AddressData): string => {
  return formatAddress(node.ip_address, node.port, node.protocol);
};

export const formatQueryParams = (params: {[key: string]: any}): string => {
  const queryParams = stringify(params);
  return queryParams.length ? `?${queryParams}` : '';
};

export const formatPath = (ipAddress: string, port: number | string, protocol: string): string => {
  return `${protocol}/${ipAddress}/${port}`;
};

export const formatPathFromNode = (node: AddressData): string => {
  return formatPath(node.ip_address, node.port, node.protocol);
};

export const formatSocketAddressFromNode = (node: AddressData): string => {
  const {ip_address: ipAddress, port} = node;
  return formatAddress(ipAddress, port, 'ws');
};

export const isSameNode = (nodeA: AddressData, nodeB: AddressData): boolean => {
  return nodeA.ip_address === nodeB.ip_address && nodeA.port === nodeB.port;
};

export const parseAddressData = (address: string): {ipAddress: string; port: number; protocol: ProtocolType} => {
  const [protocol, ipAddress, port] = address.replace('//', '').split(':');

  return {
    ipAddress,
    port: parseInt(port, 10),
    protocol: protocol as ProtocolType,
  };
};

export const parseQueryParams = (url: string): ParsedUrlQuery => {
  const questionMarkIndex = url.indexOf('?');
  if (questionMarkIndex === -1) return {};

  const parsedQueryParamObject = parse(url.slice(questionMarkIndex + 1));

  return Object.entries(parsedQueryParamObject).reduce((acc, [queryParam, value]) => {
    if (!value) return acc;

    if (Array.isArray(value))
      return {
        ...acc,
        [queryParam]: value.join(','),
      };

    return {
      ...acc,
      [queryParam]: value,
    };
  }, {});
};
