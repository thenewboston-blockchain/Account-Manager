import {formatDate} from './dates';

describe('formatDate to return the following:', () => {
  test('correctly formatted date', () => {
    expect(formatDate('2020-08-28T16:26:19.902626Z')).toEqual('2020-08-28 04:26:19 PM');
  });

  test('return empty string for empty date', () => {
    expect(formatDate('')).toEqual('');
  });
});
