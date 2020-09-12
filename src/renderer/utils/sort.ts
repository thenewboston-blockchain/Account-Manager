import sortBy from 'lodash/sortBy';

import {Dict} from '@renderer/types';

export function sortByBooleanKey<T>(key: keyof T) {
  return (a: T, b: T) => {
    return (Number(b[key]) || 0) - (Number(a[key]) || 0);
  };
}

export function sortByPreferredKey<T>(items: Dict<T>, fallbackKey: keyof T, preferredKey: keyof T): T[] {
  const fallbackItems: T[] = [];
  const preferredItems: T[] = [];

  Object.values(items).forEach((item) => {
    const group = item[preferredKey] ? preferredItems : fallbackItems;
    group.push(item);
  });

  return [...sortBy(preferredItems, [preferredKey]), ...sortBy(fallbackItems, [fallbackKey])];
}
