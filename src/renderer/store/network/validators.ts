import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {NETWORK_VALIDATORS} from '@renderer/constants/store';
import {NetworkNode} from '@renderer/types/entities';
import {Loading, StateSlice} from '@renderer/types/store';

type State = StateSlice<{[nodeIdentifier: string]: NetworkNode}>;

const validators = createSlice({
  initialState: {
    currentRequestId: undefined,
    entities: {},
    error: null,
    loading: Loading.idle,
  } as State,
  name: NETWORK_VALIDATORS,
  reducers: {
    set: (state, action: PayloadAction<NetworkNode>) => {
      const {node_identifier: nodeIdentifier} = action.payload;
      state.entities[nodeIdentifier] = action.payload;
    },
  },
});

export const {set: setNetworkValidator} = validators.actions;

export default validators;
