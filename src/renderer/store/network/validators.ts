import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {NETWORK, VALIDATORS} from '@renderer/constants/store';
import {Node} from '@renderer/types/entities';
import {Loading, StateSlice} from '@renderer/types/store';
import {sliceActionType} from '@renderer/utils/store';

type State = StateSlice<{[nodeIdentifier: string]: Node}>;

const validators = createSlice({
  initialState: {
    currentRequestId: undefined,
    entities: {},
    error: null,
    loading: Loading.idle,
  } as State,
  name: sliceActionType(NETWORK, VALIDATORS),
  reducers: {
    set: (state, action: PayloadAction<Node>) => {
      const {node_identifier: nodeIdentifier} = action.payload;
      state.entities[nodeIdentifier] = action.payload;
    },
  },
});

export const {set: setValidator} = validators.actions;

export default validators;
