import {PayloadAction} from '@reduxjs/toolkit';

import localStore from '@renderer/store/localStore';
import {Data} from '@renderer/types/store';

type ActionType = PayloadAction<any>;

export const getStateName = (actionType: string) => actionType.split('/')[1];

export const setLocalAndStateReducer = (state: any, action: ActionType) => {
  const name = getStateName(action.type);
  localStore.set(name, action.payload);
  return action.payload;
};

export const setStateReducer = (state: any, action: ActionType) => action.payload;

export const setNodeReducer = (state: Data<any>, action: ActionType): void => {
  const {node_identifier: nodeIdentifier} = action.payload;
  state[nodeIdentifier] = action.payload;
};

export const unsetStateToNullReducer = () => null;
