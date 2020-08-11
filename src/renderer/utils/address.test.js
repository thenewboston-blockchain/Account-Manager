import {formatAddress} from './address';

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
