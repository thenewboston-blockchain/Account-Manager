import {PayloadAction, SerializedError} from '@reduxjs/toolkit';
import {Loading, StateSlice} from '@renderer/types/store';

export const createActionType = (sliceName: string): string => `${sliceName}/create`;

export const deleteActionType = (sliceName: string): string => `${sliceName}/delete`;

export const fetchActionType = (sliceName: string): string => `${sliceName}/fetch`;

export const fetchByIdActionType = (sliceName: string): string => `${sliceName}/fetchById`;

export const updateActionType = (sliceName: string): string => `${sliceName}/update`;

type ActionType = PayloadAction<any, string, {arg: void; requestId: string}, never>;
type RejectedActionType = PayloadAction<
  any,
  string,
  {arg: void; requestId: string; aborted: boolean; condition: boolean},
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
    state.entities = action.payload;
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
