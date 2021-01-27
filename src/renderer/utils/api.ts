import axios from 'axios';
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
import {AXIOS_TIMEOUT_MS} from '@renderer/config';

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

    const data: PaginatedResults<T> = {
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
