import store from '@renderer/store';
import {PaginatedResults} from '@renderer/types/api';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export interface Dict<T> {
  [key: string]: T;
}

export interface Error {
  error: string | null;
}

export type DictWithError = Dict<Error>;

export type DictWithDataAndError<T> = Dict<Error & {data: T}>;

export type DictWithPaginatedResultsAndError<T> = Dict<PaginatedResults<T> & Error>;
