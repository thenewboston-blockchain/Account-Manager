import axios from 'axios';
import {
  AppDispatch,
  BankConfig,
  PaginatedQueryParams,
  PaginatedResults,
  PrimaryValidatorConfig,
  ProtocolType,
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
  } catch (error: any) {
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

export const isInsecureHttp = (protocol: string) => protocol === 'http';

export const sanitizePortFieldFromRawPrimaryValidatorConfig = (
  data: RawPrimaryValidatorConfig,
  address?: string,
): PrimaryValidatorConfig => {
  return {
    ...data,
    port: isInsecureHttp(data.protocol) ? replaceNullPortFieldWithDefaultValue(data.port) : undefined,
  };
};


interface FormatPortArgs {
  port: string;
  protocol: ProtocolType;
}

export const formatPort = ({port, protocol}: FormatPortArgs) => {
  if (isInsecureHttp(protocol) && port) {
    return Number(port);
  }

  if (isInsecureHttp(protocol) && port === undefined) {
    return 80;
  }

  const isHttps = !isInsecureHttp(protocol);
  if (isHttps) {
    return undefined;
  }
};