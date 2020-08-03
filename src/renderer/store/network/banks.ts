import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {NETWORK_BANKS} from '@renderer/constants/store';
import {NetworkNode} from '@renderer/types/entities';
import {Loading, StateSlice} from '@renderer/types/store';

type State = StateSlice<{[nodeIdentifier: string]: NetworkNode}>;

const banks = createSlice({
  initialState: {
    currentRequestId: undefined,
    entities: {},
    error: null,
    loading: Loading.idle,
  } as State,
  name: NETWORK_BANKS,
  reducers: {
    set: (state, action: PayloadAction<NetworkNode>) => {
      const {node_identifier: nodeIdentifier} = action.payload;
      state.entities[nodeIdentifier] = action.payload;
    },
  },
});

export const {set: setNetworkBank} = banks.actions;

export default banks;
