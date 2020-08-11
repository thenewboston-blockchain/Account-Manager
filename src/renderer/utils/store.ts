import {PayloadAction} from '@reduxjs/toolkit';

import localStore from '@renderer/store/localStore';
import {
  DictWithDataAndError,
  DictWithError,
  DictWithPaginatedResultsAndError,
  NodeIdentifier,
  PaginatedResults,
} from '@renderer/types';

interface Address {
  address: string;
}
interface Error {
  error: any;
}
type PayloadActionWithAddress = PayloadAction<Address>;
type PayloadActionWithDataAddress<T = undefined> = PayloadAction<Address & {data?: T}>;
type PaginatedPayloadActionWithAddress<T = undefined> = PayloadAction<PaginatedResults<T> & Address>;
type PayloadActionErrorWithAddress = PayloadAction<Error & Address>;

export type SetResults<T> = (payload: PaginatedResults<T> & Address) => PayloadAction<PaginatedResults<T> & Address>;
export type SetError = (payload: Address & Error) => PayloadAction<Address & Error>;

export const getStateName = (actionType: string) => actionType.split('/')[1];

export function setLocalAndStateReducer<T>() {
  return (state: any, action: PayloadAction<T>) => {
    const name = getStateName(action.type);
    localStore.set(name, action.payload);
    return action.payload;
  };
}

export function setStateReducer<T>() {
  return (state: any, action: PayloadAction<T>) => action.payload;
}

export function setNodeReducer<T extends NodeIdentifier>() {
  return (state: any, action: PayloadAction<T>) => {
    const {node_identifier: nodeIdentifier} = action.payload;
    state[nodeIdentifier] = action.payload;
  };
}

export function setDataReducer<T>() {
  return (state: DictWithDataAndError<any>, {payload: {address, data}}: PayloadActionWithDataAddress<T>) => {
    if (!state[address]) {
      state[address] = {
        data,
        error: null,
      };
      return;
    }
    state[address].error = null;
    state[address].data = data;
  };
}

export function setDataErrorReducer() {
  return (state: DictWithDataAndError<any>, {payload: {address, error}}: PayloadActionErrorWithAddress) => {
    if (!state[address]) {
      state[address] = {
        data: null,
        error,
      };
      return;
    }
    state[address].error = error;
    state[address].data = null;
  };
}

export function setPaginatedResultReducer<T>() {
  return (
    state: DictWithPaginatedResultsAndError<any>,
    {payload: {address, count, next, previous, results}}: PaginatedPayloadActionWithAddress<T>,
  ) => {
    if (!state[address]) {
      state[address] = {
        count,
        error: null,
        next,
        previous,
        results,
      };
      return;
    }
    state[address].error = null;
    state[address].count = count;
    state[address].next = next;
    state[address].previous = previous;
    state[address].results = results;
  };
}

export function setPaginatedResultErrorReducer() {
  return (state: DictWithPaginatedResultsAndError<any>, {payload: {address, error}}: PayloadActionErrorWithAddress) => {
    if (!state[address]) {
      state[address] = {
        count: null,
        error,
        next: null,
        previous: null,
        results: [],
      };
      return;
    }
    state[address].error = error;
    state[address].count = null;
    state[address].next = null;
    state[address].previous = null;
    state[address].results = [];
  };
}

export function unsetDataReducer() {
  return (state: DictWithError, {payload: {address}}: PayloadActionWithAddress) => {
    delete state[address];
  };
}

export function unsetStateToNullReducer() {
  return () => null;
}
