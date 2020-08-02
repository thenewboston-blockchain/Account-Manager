import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {NETWORK, VALIDATORS} from '@renderer/constants/store';
import {Node} from '@renderer/types/entities';
import {Loading, StateSlice} from '@renderer/types/store';

type State = StateSlice<{[nodeIdentifier: string]: Node}>;

const validators = createSlice({
  initialState: {
    currentRequestId: undefined,
    entities: {},
    error: null,
    loading: Loading.idle,
  } as State,
  name: `${NETWORK}/${VALIDATORS}`,
  reducers: {
    set: (state, action: PayloadAction<{node: Node; nodeIdentifier: string}>) => {
      const {nodeIdentifier, node} = action.payload;
      state.entities[nodeIdentifier] = node;
    },
  },
});

export const {set: setValidator} = validators.actions;

export default validators;
