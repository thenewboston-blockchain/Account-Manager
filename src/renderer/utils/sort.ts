export function sortByBooleanKey<T>(key: keyof T) {
  return (a: T, b: T) => {
    return (Number(b[key]) || 0) - (Number(a[key]) || 0);
  };
}
