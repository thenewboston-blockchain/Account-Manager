import {PayloadAction} from '@reduxjs/toolkit';
import {Data} from '@renderer/types/store';

type ActionType = PayloadAction<any>;

export const setStateReducer = (state: any, action: ActionType) => action.payload;

export const setNodeReducer = (state: Data<any>, action: ActionType): void => {
  const {node_identifier: nodeIdentifier} = action.payload;
  state[nodeIdentifier] = action.payload;
};
