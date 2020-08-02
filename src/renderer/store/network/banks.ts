import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {BANKS, NETWORK} from '@renderer/constants/store';
import {Node} from '@renderer/types/entities';
import {Loading, StateSlice} from '@renderer/types/store';
import {sliceActionType} from '@renderer/utils/store';

type State = StateSlice<{[nodeIdentifier: string]: Node}>;

const banks = createSlice({
  initialState: {
    currentRequestId: undefined,
    entities: {},
    error: null,
    loading: Loading.idle,
  } as State,
  name: sliceActionType(NETWORK, BANKS),
  reducers: {
    set: (state, action: PayloadAction<Node>) => {
      const {node_identifier: nodeIdentifier} = action.payload;
      state.entities[nodeIdentifier] = action.payload;
    },
  },
});

export const {set: setBank} = banks.actions;

export default banks;
