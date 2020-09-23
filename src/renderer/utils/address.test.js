import {formatAddress, parseAddressData, parseQueryParams} from './address';

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

describe('parseAddressData to return the following: ', () => {
  test('parse ipAddress, port, protocol', () => {
    expect(parseAddressData('https://127.0.0.1:8081')).toMatchObject({
      ipAddress: '127.0.0.1',
      port: 8081,
      protocol: 'https',
    });
  });

  test('when a protocol is https it should return protocol property as https', () => {
    expect(parseAddressData('https://127.0.0.1:8081')).toHaveProperty('protocol', 'https');
  });

  test('when a protocol is https it should return protocol property as http', () => {
    expect(parseAddressData('http://127.0.0.1:8081')).toHaveProperty('protocol', 'http');
  });

  test('if no port is provided should return port property as null', () => {
    expect(parseAddressData('http://127.0.0.1')).toHaveProperty('port', null);
  });

  test('port if provided should be a number type', () => {
    const parsedData = parseAddressData('http://127.0.0.1:8081');
    expect(typeof parsedData.port === 'number').toBeTruthy();
  });
});

describe('parseQueryParams to return the following: ', () => {
  test('return empty object if no "?" in the string ', () => {
    expect(parseQueryParams('')).toMatchObject({});
  });

  test('return empty object if no characters after the "?" in the string ', () => {
    expect(parseQueryParams('?')).toMatchObject({});
  });

  test('should return correct query params in a string', () => {
    expect(parseQueryParams('http://127.0.0.1:8081/test?param1=1&param2=abc')).toMatchObject({
      param1: '1',
      param2: 'abc',
    });
  });

  test('should return one param when there is only param', () => {
    expect(parseQueryParams('test?param1=abc')).toMatchObject({
      param1: 'abc',
    });
  });

  test('when same param is passed multiple times it should be combined with comma', () => {
    expect(parseQueryParams('test?param1=abc,123')).toMatchObject({
      param1: 'abc,123',
    });
  });
});
