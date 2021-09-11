import {ProtocolType} from '@renderer/types';

export const PAGINATED_RESULTS_LIMIT = 30;

export const defaultPaginatedQueryParam = {
  limit: PAGINATED_RESULTS_LIMIT,
};

export const AXIOS_TIMEOUT_MS = 10_000;

export const DEFAULT_BANK = {
  ip_address: '54.183.16.194',
  port: 80,
  protocol: 'http' as ProtocolType,
};
