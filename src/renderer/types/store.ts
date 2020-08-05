import store from '@renderer/store';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export interface Data<T> {
  [key: string]: T;
}
