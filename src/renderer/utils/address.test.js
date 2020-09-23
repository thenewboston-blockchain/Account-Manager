import {
  formatAddress,
  formatAddressFromNode,
  formatQueryParams,
  formatPath,
  formatPathFromNode,
  parseAddressData,
  parseQueryParams,
} from './address';

describe('formatAddress to return the following: ', () => {
  test('correct IP without port when port 80 as string is passed', () => {
    expect(formatAddress('127.0.0.1', '80', 'http')).toBe('http://127.0.0.1');
  });

  test('correct IP without port when port 80 as number is passed', () => {
    expect(formatAddress('127.0.0.1', 80, 'https')).toBe('https://127.0.0.1');
  });

  test('correct IP with port when some other port as string is passed', () => {
    expect(formatAddress('127.0.0.1', '8081', 'http')).toBe('http://127.0.0.1:8081');
  });

  test('correct IP with port when some other port as number is passed', () => {
    expect(formatAddress('127.0.0.1', 8081, 'http')).toBe('http://127.0.0.1:8081');
  });

  test('correct IP with port as the string port is passed', () => {
    expect(formatAddress('127.0.0.1', 'port', 'http')).toBe('http://127.0.0.1');
  });

  test('correct IP with port as null', () => {
    expect(formatAddress('127.0.0.1', null, 'https')).toBe('https://127.0.0.1');
  });
});

describe('formatAddressFromNode to return the following: ', () => {
  test('correct IP from node with port as null', () => {
    const nodeAddress = {
      ip_address: '127.0.0.1',
      port: null,
      protocol: 'http',
    };
    expect(formatAddressFromNode(nodeAddress)).toBe('http://127.0.0.1');
  });

  test('correct IP from node with port as number 80', () => {
    const nodeAddress = {
      ip_address: '127.0.0.1',
      port: 80,
      protocol: 'https',
    };
    expect(formatAddressFromNode(nodeAddress)).toBe('https://127.0.0.1');
  });

  test('correct IP from node with port as string', () => {
    const nodeAddress = {
      ip_address: '127.0.0.1',
      port: '80',
      protocol: 'http',
    };
    expect(formatAddressFromNode(nodeAddress)).toBe('http://127.0.0.1');
  });

  test('correct IP from node with port 8080 as number', () => {
    const nodeAddress = {
      ip_address: '127.0.0.1',
      port: 8080,
      protocol: 'http',
    };
    expect(formatAddressFromNode(nodeAddress)).toBe('http://127.0.0.1:8080');
  });

  test('correct IP from node with port 8080 as string', () => {
    const nodeAddress = {
      ip_address: '127.0.0.1',
      port: '8080',
      protocol: 'https',
    };
    expect(formatAddressFromNode(nodeAddress)).toBe('https://127.0.0.1:8080');
  });
});

describe('formatQueryParams to return the following: ', () => {
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

describe('formatPath to return the following: ', () => {
  test('correct Path with port when port as null is passed', () => {
    expect(formatPath('127.0.0.1', null, 'http')).toBe('http/127.0.0.1/port');
  });

  test('correct Path when port 80 as number is passed', () => {
    expect(formatPath('127.0.0.1', 80, 'https')).toBe('https/127.0.0.1/80');
  });

  test('correct Path when port 80 as string is passed', () => {
    expect(formatPath('127.0.0.1', '80', 'https')).toBe('https/127.0.0.1/80');
  });

  test('correct Path when port of null is passed', () => {
    expect(formatPath('127.0.0.1', null, 'https')).toBe('https/127.0.0.1/port');
  });
});

describe('formatPathFromNode to return the following: ', () => {
  test('correct Path with port when port as null is passed', () => {
    const nodePath = {
      ip_address: '127.0.0.1',
      port: null,
      protocol: 'http',
    };
    expect(formatPathFromNode(nodePath)).toBe('http/127.0.0.1/port');
  });

  test('correct Path when port 8080 as number is passed', () => {
    const nodePath = {
      ip_address: '127.0.0.1',
      port: 8080,
      protocol: 'http',
    };
    expect(formatPathFromNode(nodePath)).toBe('http/127.0.0.1/8080');
  });

  test('correct Path when port 80 as string is passed', () => {
    const nodePath = {
      ip_address: '127.0.0.1',
      port: '80',
      protocol: 'https',
    };
    expect(formatPathFromNode(nodePath)).toBe('https/127.0.0.1/80');
  });
});

describe('parseAddressData to return the following: ', () => {
  test('correct Address object with port null when port not specified', () => {
    const expectedAddressData = {
      ipAddress: '127.0.0.1',
      port: null,
      protocol: 'http',
    };
    expect(parseAddressData('http://127.0.0.1')).toMatchObject(expectedAddressData);
  });

  test('correct Address object with port 80 when port 80 is specified', () => {
    const expectedAddressData = {
      ipAddress: '127.0.0.1',
      port: 80,
      protocol: 'http',
    };
    expect(parseAddressData('http://127.0.0.1:80')).toMatchObject(expectedAddressData);
  });

  test('correct Address object with port 8080 when port 8080 is specified', () => {
    const expectedAddressData = {
      ipAddress: '127.0.0.1',
      port: 8080,
      protocol: 'http',
    };
    expect(parseAddressData('http://127.0.0.1:8080')).toMatchObject(expectedAddressData);
  });

  test('correct Address object when protocol as https is specified', () => {
    const expectedAddressData = {
      ipAddress: '127.0.0.1',
      port: null,
      protocol: 'https',
    };
    expect(parseAddressData('https://127.0.0.1')).toMatchObject(expectedAddressData);
  });

  test('port if provided should be a number type', () => {
    const parsedData = parseAddressData('http://127.0.0.1:8081');
    expect(typeof parsedData.port === 'number').toBeTruthy();
  });
});

describe('parseQueryParams to return the following: ', () => {
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
