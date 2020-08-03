import {PayloadAction, SerializedError} from '@reduxjs/toolkit';
import {Loading, StateSlice} from '@renderer/types/store';

type ActionType = PayloadAction<any, string, {arg: any; requestId: string}, never>;
type RejectedActionType = PayloadAction<
  any,
  string,
  {arg: any; requestId: string; aborted: boolean; condition: boolean},
  SerializedError
>;
type StateType = StateSlice<any>;

export const pendingReducer = (state: StateType, action: ActionType): void => {
  if (state.loading === Loading.idle) {
    state.loading = Loading.pending;
    state.currentRequestId = action.meta.requestId;
  }
};

export const fulfilledReducer = (state: StateType, action: ActionType): void => {
  if (state.loading === Loading.pending && state.currentRequestId === action.meta.requestId) {
    state.loading = Loading.idle;
    state.currentRequestId = undefined;
  }
};

export const rejectedReducer = (state: StateType, action: RejectedActionType): void => {
  if (state.loading === Loading.pending && state.currentRequestId === action.meta.requestId) {
    state.loading = Loading.idle;
    state.error = action.error;
    state.currentRequestId = undefined;
  }
};

export const setStateReducer = (state: StateType, action: ActionType): void => {
  if (state.loading === Loading.pending && state.currentRequestId === action.meta.requestId) {
    state.entities = action.payload;
    fulfilledReducer(state, action);
  }
};

export const setNodeReducer = (state: StateType, action: ActionType): void => {
  if (state.loading === Loading.pending && state.currentRequestId === action.meta.requestId) {
    const {node_identifier: nodeIdentifier} = action.payload;
    state.entities[nodeIdentifier] = action.payload;
    fulfilledReducer(state, action);
  }
};
