import {getCustomClassNames} from './components';

describe('getCustomClassNames to return the following:', () => {
  test('empty object when classNames is undefined', () => {
    expect(getCustomClassNames(undefined, '--error', true)).toEqual({});
  });
  test('correct custom class name when classNames is one class', () => {
    expect(getCustomClassNames('test', '--error', true)).toEqual({'test--error': true});
  });
  test('correct custom class name when classNames has multiple classes', () => {
    expect(getCustomClassNames('class-a class-b', '--error', true)).toEqual({
      'class-a--error': true,
      'class-b--error': true,
    });
  });
  test('correct result when boolean is false', () => {
    expect(getCustomClassNames('class-a class-b', '--error', false)).toEqual({
      'class-a--error': false,
      'class-b--error': false,
    });
  });
});
