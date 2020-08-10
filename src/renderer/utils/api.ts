import axios from 'axios';
import {PaginatedResults} from '@renderer/types/api';
import {AppDispatch} from '@renderer/types/store';
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
