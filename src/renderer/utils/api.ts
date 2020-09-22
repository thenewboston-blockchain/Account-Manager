import axios from 'axios';
import {AppDispatch, PaginatedQueryParams, PaginatedResults} from '@renderer/types';
import {formatQueryParams} from '@renderer/utils/address';
import {SetError, SetResults} from '@renderer/utils/store';

export async function fetchPaginatedResults<T>(
  address: string,
  urlParam: string,
  queryParams: PaginatedQueryParams,
  dispatch: AppDispatch,
  setResults: SetResults<T>,
  setError: SetError,
) {
  try {
    const {data} = await axios.get<PaginatedResults<T>>(`${address}/${urlParam}${formatQueryParams(queryParams)}`);

    dispatch(setResults({address, ...data}));
    return data.results;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    dispatch(setError({address, error: error.response.data}));
  }
}
