import store from '@renderer/store';
import {Error, PaginatedResultsWithError} from './network';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export interface Dict<T> {
  [key: string]: T;
}

export type DictWithError = Dict<Error>;

export type DictWithDataAndError<T> = Dict<Error & {data: T}>;

export type DictWithPaginatedResultsAndError<T> = Dict<PaginatedResultsWithError<T>>;
