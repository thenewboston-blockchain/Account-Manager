export const PAGINATED_RESULTS_LIMIT = 30;

export const defaultPaginatedQueryParam = {
  limit: PAGINATED_RESULTS_LIMIT,
};

export const AXIOS_TIMEOUT_MS = 5000;

// Fuse Search  options
export const searchOptionMaker = (args: string[]) => {
  return {
    includeScore: false,
    keys: [...args],
  };
};
