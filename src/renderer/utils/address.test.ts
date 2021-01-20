import {ProtocolType} from '@renderer/types';
import {
  formatAddress,
  formatAddressFromNode,
  formatPath,
  formatPathFromNode,
  formatQueryParams,
  parseAddressData,
  parseQueryParams,
} from './address';

describe('formatAddress to return the following:', () => {
  test('correct IP without port when port as string is passed', () => {
    expect(formatAddress('127.0.0.1', '80', 'http')).toBe('http://127.0.0.1:80');
  });

  test('correct IP without port when port as number is passed', () => {
    expect(formatAddress('127.0.0.1', 80, 'https')).toBe('https://127.0.0.1:80');
  });
});

describe('formatAddressFromNode to return the following:', () => {
  test('correct IP from node with port as number', () => {
    const nodeAddress = {
      ip_address: '127.0.0.1',
      port: 80,
      protocol: 'https' as ProtocolType,
    };
    expect(formatAddressFromNode(nodeAddress)).toBe('https://127.0.0.1:80');
  });
});

describe('formatQueryParams to return the following:', () => {
  test('empty query string with no params', () => {
    const params = {};
    expect(formatQueryParams(params)).toBe('');
  });

  test('correct query string concatenation with one numeric parameter', () => {
    const params = {
      id: 1,
    };
    expect(formatQueryParams(params)).toBe('?id=1');
  });

  test('correct query string concatenation with numeric and string params', () => {
    const params = {
      confirmation: '0x000001',
      id: 1,
      transaction: 'send',
    };
    expect(formatQueryParams(params)).toBe('?confirmation=0x000001&id=1&transaction=send');
  });
});

describe('formatPath to return the following:', () => {
  test('correct Path when port as number is passed', () => {
    expect(formatPath('127.0.0.1', 80, 'https')).toBe('https/127.0.0.1/80');
  });

  test('correct Path when port as string is passed', () => {
    expect(formatPath('127.0.0.1', '80', 'https')).toBe('https/127.0.0.1/80');
  });
});

describe('formatPathFromNode to return the following:', () => {
  test('correct Path when port as number is passed', () => {
    const nodePath = {
      ip_address: '127.0.0.1',
      port: 8080,
      protocol: 'http' as ProtocolType,
    };
    expect(formatPathFromNode(nodePath)).toBe('http/127.0.0.1/8080');
  });
});

describe('parseAddressData to return the following:', () => {
  test('correct Address object with port as number', () => {
    const expectedAddressData = {
      ipAddress: '127.0.0.1',
      port: 8080,
      protocol: 'http',
    };
    expect(parseAddressData('http://127.0.0.1:8080')).toMatchObject(expectedAddressData);
  });

  test('port if provided should be a number type', () => {
    const parsedData = parseAddressData('http://127.0.0.1:8081');
    expect(typeof parsedData.port).toBe('number');
  });
});

describe('parseQueryParams to return the following:', () => {
  test('correct QueryParams object with empty string passed', () => {
    const expectedQueryParams = {};
    expect(parseQueryParams('')).toMatchObject(expectedQueryParams);
  });

  test('correct QueryParams object with question mark passed', () => {
    const expectedQueryParams = {};
    expect(parseQueryParams('?')).toMatchObject(expectedQueryParams);
  });

  test('correct QueryParams object with no assigned parameter passed', () => {
    const expectedQueryParams = {};
    expect(parseQueryParams('?transaction')).toMatchObject(expectedQueryParams);
  });

  test('correct QueryParams object with one parameters passed', () => {
    const expectedQueryParams = {
      id: '1',
    };
    expect(parseQueryParams('?id=1')).toMatchObject(expectedQueryParams);
  });

  test('correct QueryParams object with multiple parameters passed', () => {
    const expectedQueryParams = {
      confirmation: '0x000001',
      id: '1',
      transaction: 'send',
    };
    expect(parseQueryParams('?confirmation=0x000001&id=1&transaction=send')).toMatchObject(expectedQueryParams);
  });

  test('correct QueryParams when same param is passed multiple times', () => {
    expect(parseQueryParams('test?param1=abc,123')).toMatchObject({
      param1: 'abc,123',
    });
  });
});
