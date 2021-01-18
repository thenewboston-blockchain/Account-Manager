import sortBy from 'lodash/sortBy';

import {Dict} from '@renderer/types';

export function sortByBooleanKey<T>(key: keyof T) {
  return (a: T, b: T) => {
    return (Number(b[key]) || 0) - (Number(a[key]) || 0);
  };
}

export function sortByNumberKey<T>(key: keyof T) {
  return (a: T, b: T) => {
    return Number(b[key]) - Number(a[key]);
  };
}

export function sortDictValuesByPreferredKey<T>(items: Dict<T>, preferredKey: keyof T, fallbackKey: keyof T): T[] {
  const preferredItems: T[] = [];
  const fallbackItems: T[] = [];

  Object.values(items).forEach((item) => {
    const group = item[preferredKey] ? preferredItems : fallbackItems;
    group.push(item);
  });

  return [...sortBy(preferredItems, [preferredKey]), ...sortBy(fallbackItems, [fallbackKey])];
}
