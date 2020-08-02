import {PayloadAction, SerializedError} from '@reduxjs/toolkit';
import {Loading, StateSlice} from '@renderer/types/store';

export const createActionType = (...slicePaths: string[]): string => `${slicePaths.join('/')}/create`;

export const deleteActionType = (...slicePaths: string[]): string => `${slicePaths.join('/')}/delete`;

export const fetchActionType = (...slicePaths: string[]): string => `${slicePaths.join('/')}/fetch`;

export const fetchListActionType = (...slicePaths: string[]): string => `${slicePaths.join('/')}/fetchList`;

export const updateActionType = (...slicePaths: string[]): string => `${slicePaths.join('/')}/update`;

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
