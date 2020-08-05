import {PayloadAction} from '@reduxjs/toolkit';

import localStore from '@renderer/store/localStore';
import {NodeIdentifier} from '@renderer/types/entities';
import {Data} from '@renderer/types/store';

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
  return (state: Data<any>, action: PayloadAction<T>) => {
    const {node_identifier: nodeIdentifier} = action.payload;
    state[nodeIdentifier] = action.payload;
  };
}

export function unsetStateToNullReducer() {
  return () => null;
}
