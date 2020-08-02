import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {fetchActivePrimaryValidator} from '@renderer/api/validators';
import {ACTIVE_PRIMARY_VALIDATOR, APP} from '@renderer/constants/store';
import {ActivePrimaryValidator} from '@renderer/types/entities';
import {Loading, StateSlice} from '@renderer/types/store';
import {fulfilledReducer, pendingReducer, rejectedReducer} from '@renderer/utils/store';

type State = StateSlice<ActivePrimaryValidator | null>;

const activePrimaryValidator = createSlice({
  // extraReducers: (builder) => {
  //   builder.addCase(fetchActivePrimaryValidator.pending, pendingReducer);
  //   builder.addCase(fetchActivePrimaryValidator.fulfilled, fulfilledReducer);
  //   builder.addCase(fetchActivePrimaryValidator.rejected, rejectedReducer);
  // },
  initialState: {
    currentRequestId: undefined,
    entities: null,
    error: null,
    loading: Loading.idle,
  } as State,
  name: `${APP}/${ACTIVE_PRIMARY_VALIDATOR}`,
  reducers: {
    set: (state, action: PayloadAction<ActivePrimaryValidator>) => {
      state.entities = action.payload;
    },
  },
});

export const {set: setActivePrimaryValidator} = activePrimaryValidator.actions;

export default activePrimaryValidator;
