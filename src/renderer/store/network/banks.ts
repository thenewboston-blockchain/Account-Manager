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
    set: (state, action: PayloadAction<{node: Node; nodeIdentifier: string}>) => {
      const {nodeIdentifier, node} = action.payload;
      state.entities[nodeIdentifier] = node;
    },
  },
});

export const {set: setBank} = banks.actions;

export default banks;
