import {useState} from 'react';

// SEARCH HOOK THAT KEEPS THE TYPE OF DATA, TAKES THE DATASET AND THE KEYS THAT IT IS GONNA SEARCH IN
const useSearch = <T,>(data: T[], filters: (keyof T)[]): [T[], (value: string) => void] => {
  const [search, setSearch] = useState('');

  const handleSearch = (value: string) => setSearch(value.trim().toLowerCase());
  const hasFilterAndSearch = filters.length > 0 && search.length > 0;

  //  dataset[filter] as any ==> type of T is not supported
  return [
    hasFilterAndSearch
      ? data.filter((dataset) => filters.some((filter) => (dataset[filter] as any).includes(search)))
      : data,
    handleSearch,
  ];
};

export default useSearch;
