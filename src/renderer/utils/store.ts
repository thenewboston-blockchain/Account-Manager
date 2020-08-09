import {PayloadAction} from '@reduxjs/toolkit';

import localStore from '@renderer/store/localStore';
import {NodeIdentifier} from '@renderer/types/entities';
import {DataWithError} from '@renderer/types/store';

type PayloadActionWithAddress<T> = PayloadAction<{address: string; data: T}>;
type PayloadActionErrorWithAddress = PayloadAction<{address: string; error: any}>;

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
  return (state: DataWithError<any>, {payload: {address, data}}: PayloadActionWithAddress<T>) => {
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

export function setErrorReducer() {
  return (state: DataWithError<any>, {payload: {address, error}}: PayloadActionErrorWithAddress) => {
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

export function unsetStateToNullReducer() {
  return () => null;
}
