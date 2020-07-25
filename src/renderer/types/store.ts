import {SerializedError} from '@reduxjs/toolkit';
import store from '@renderer/store';

import {Bank} from '@renderer/types/entities/Bank';

export type RootState = ReturnType<typeof store.getState>;

export interface Data<T> {
  [key: string]: T;
}

export enum Loading {
  'pending' = 'pending',
  'idle' = 'idle',
}

export interface StateSlice<S> {
  entities: S;
  loading: Loading;
  currentRequestId?: string;
  error: SerializedError | null;
}

export {Bank};
