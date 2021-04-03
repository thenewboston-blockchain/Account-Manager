import axios from 'axios';
import {Bank} from 'thenewboston';

import {AXIOS_TIMEOUT_MS, defaultPaginatedQueryParam} from '@renderer/config';
import {
  ACCOUNTS,
  BANK_TRANSACTIONS,
  BANKS,
  BLOCKS,
  CONFIRMATION_BLOCKS,
  INVALID_BLOCKS,
  VALIDATOR_CONFIRMATION_SERVICES,
  VALIDATORS,
} from '@renderer/constants/actions';

import {
  AppDispatch,
  BankConfig,
  PaginatedQueryParams,
  PaginatedResults,
  PrimaryValidatorConfig,
  RawBankConfig,
  RawPrimaryValidatorConfig,
} from '@renderer/types';

import {formatQueryParams} from '@renderer/utils/address';
import {SetError, SetResults} from '@renderer/utils/store';

const formatPaginatedData = <T extends unknown>(rawData: PaginatedResults<T>) => {
  return {
    ...rawData,
    results: rawData.results.map((result: any) => {
      if (!result.port) {
        return {
          ...result,
          port: replaceNullPortFieldWithDefaultValue(result.port),
        };
      }
      return result;
    }),
  };
};

export async function fetchBankPaginatedResults<T>(
  address: string,
  action: string,
  queryParams: PaginatedQueryParams,
  dispatch: AppDispatch,
  setResults: SetResults<T>,
  setError: SetError,
) {
  const bank = new Bank(address, {defaultPagination: {limit: defaultPaginatedQueryParam.limit, offset: 0}});

  let rawData;

  try {
    switch (action) {
      case ACCOUNTS:
        rawData = await bank.getAccounts();
        break;

      case BANKS:
        rawData = await bank.getBanks();
        break;

      case BANK_TRANSACTIONS:
        rawData = await bank.getTransactions();
        break;

      case BLOCKS:
        rawData = await bank.getBlocks();
        break;

      case CONFIRMATION_BLOCKS:
        rawData = await bank.getConfirmationBlocks(queryParams);
        break;

      case INVALID_BLOCKS:
        rawData = await bank.getInvalidBlocks(queryParams);
        break;

      case VALIDATOR_CONFIRMATION_SERVICES:
        rawData = await bank.getValidatorConfirmationServices(queryParams);
        break;

      case VALIDATORS:
        rawData = await bank.getValidators(queryParams);
        break;

      default:
        throw new Error('Fetch Bank Pagination Action not Set');
    }

    const data = formatPaginatedData(rawData);

    dispatch(setResults({address, ...data}));
    return data.results;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    dispatch(setError({address, error: error.response.data}));
  }
}

export async function fetchPaginatedResults<T>(
  address: string,
  urlParam: string,
  queryParams: PaginatedQueryParams,
  dispatch: AppDispatch,
  setResults: SetResults<T>,
  setError: SetError,
) {
  try {
    const {data: rawData} = await axios.get<PaginatedResults<T>>(
      `${address}/${urlParam}${formatQueryParams(queryParams)}`,
      {timeout: AXIOS_TIMEOUT_MS},
    );

    const data = formatPaginatedData(rawData);

    dispatch(setResults({address, ...data}));
    return data.results;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    dispatch(setError({address, error: error.response.data}));
  }
}

const replaceNullPortFieldWithDefaultValue = (port: number | null): number => {
  if (port === null) {
    return 80;
  }
  return port;
};

export const sanitizePortFieldFromRawBankConfig = (data: RawBankConfig): BankConfig => {
  return {
    ...data,
    port: replaceNullPortFieldWithDefaultValue(data.port),
    primary_validator: sanitizePortFieldFromRawPrimaryValidatorConfig(data.primary_validator),
  };
};

export const sanitizePortFieldFromRawPrimaryValidatorConfig = (
  data: RawPrimaryValidatorConfig,
): PrimaryValidatorConfig => {
  return {
    ...data,
    port: replaceNullPortFieldWithDefaultValue(data.port),
  };
};
