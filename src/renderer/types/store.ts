import store from '@renderer/store';

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
  error: any;
}
