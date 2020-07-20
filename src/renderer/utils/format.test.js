import {formatAddress} from './format.ts';

describe('formatAddress to return the following: ', () => {
  test('correct IP without port when port 80 is passed', () => {
    expect(formatAddress('127.0.0.1', '80', 'http')).toBe('http://127.0.0.1');
  });

  test('correct IP with port when some other port is passed', () => {
    expect(formatAddress('127.0.0.1', '8081', 'http')).toBe('http://127.0.0.1:8081');
  });

  test('URL with FILE protocol, when no protocol is passed', () => {
    expect(formatAddress('127.0.0.1', '8081')).toBe('file://127.0.0.1:8081');
  });
});
