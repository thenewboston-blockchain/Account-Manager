import {parse, ParsedUrlQuery, stringify} from 'querystring';
import {AddressData, Protocol, ProtocolType, Port} from '@renderer/types';

interface FormatPortArgs {
  port: string;
  protocol: ProtocolType | string;
}

export const formatPort = ({port, protocol}: FormatPortArgs) => {
  if (isInsecureHttp(protocol) && port) {
    return Number(port);
  }

  if (isInsecureHttp(protocol) && port === undefined) {
    return Port.HTTP;
  }

  const isHttps = !isInsecureHttp(protocol);
  if (isHttps) {
    return Port.HTTPS;
  }
};

export const isInsecureHttp = (protocol: string) => protocol === 'http';

export const formatAddress = (protocol: string, ipAddress: string, port?: number | string): string => {
  const template = `${protocol}://${ipAddress}`;
  return isInsecureHttp(protocol) ? `${template}:${port}` : `${template}`;
};

export const formatAddressFromNode = (node: AddressData, address?: string): string => {
  if (address?.includes('https')) {
    return formatAddress('https', address?.replace('https://', ''), Port.HTTPS);
  }
  return formatAddress(node.protocol, node.ip_address, node.port);
};

export const formatQueryParams = (params: {[key: string]: any}): string => {
  const queryParams = stringify(params);
  return queryParams.length ? `?${queryParams}` : '';
};

export const formatPath = (protocol: string, ipAddress: string, port?: number | string): string => {
  return `${protocol}/${ipAddress}/${port}`;
};

export const formatPathFromNode = (node: AddressData): string => {
  return formatPath(node.protocol, node.ip_address, node.port);
};

interface Options {
  node: AddressData;
  address?: string;
  protocol?: Protocol;
}

export const formatPathWithSecureNode = ({node, address, protocol}: Options): string => {
  if (address?.includes(Protocol.HTTPS) || protocol === Protocol.HTTPS) {
    // note: this is a hack
    // TODO: (wakawaka) fix hardcoding of https port
    return `https/${address?.replace('https://', '')}/${Port.HTTPS}`;
  }
  return formatPath(node.protocol, node.ip_address, node.port);
};

export const formatSocketAddressFromNode = (node: AddressData): string => {
  const {ip_address: ipAddress, port, protocol} = node;

  const websocketMethod = isInsecureHttp(protocol) ? 'ws' : 'wss';
  return formatAddress(websocketMethod, ipAddress, port);
};

export const isSameNode = (nodeA: AddressData, nodeB: AddressData): boolean => {
  return nodeA.ip_address === nodeB.ip_address && nodeA.port === nodeB.port;
};

export const parseAddressData = (
  address: string,
): {ipAddress: string; port: number | undefined; protocol: ProtocolType} => {
  const [protocol, ipAddress, port] = address.replace('//', '').split(':');

  return {
    ipAddress,
    port: formatPort({port, protocol}),
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
