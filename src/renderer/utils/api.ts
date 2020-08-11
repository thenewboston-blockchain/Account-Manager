import axios from 'axios';
import {AppDispatch, PaginatedResults} from '@renderer/types';
import {SetError, SetResults} from '@renderer/utils/store';

export async function fetchPaginatedResults<T>(
  address: string,
  urlParam: string,
  dispatch: AppDispatch,
  setResults: SetResults<T>,
  setError: SetError,
) {
  try {
    const {data} = await axios.get<PaginatedResults<T>>(`${address}/${urlParam}`);

    dispatch(setResults({address, ...data}));
    return data.results;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    dispatch(setError({address, error: error.response.data}));
  }
}
