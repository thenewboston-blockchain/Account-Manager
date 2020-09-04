import {getCustomClassNames} from './components';

describe('getCustomClassNames to return the following: ', () => {
  test('empty object when classNames is undefined', () => {
    expect(getCustomClassNames(undefined, '--error', true)).toEqual({});
  });
  test('correct custom class name when classNames is empty string', () => {
    expect(getCustomClassNames('', '--error', true)).toEqual({'--error': true});
  });
  test('correct custom class name when classNames is not empty', () => {
    expect(getCustomClassNames('class_a class_b', '--error', true)).toEqual({
      'class_a--error': true,
      'class_b--error': true,
    });
  });
});
