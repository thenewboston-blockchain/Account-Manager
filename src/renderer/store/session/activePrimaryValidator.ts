import {createSlice} from '@reduxjs/toolkit';

import {fetchActivePrimaryValidator} from '@renderer/api/validators';
import {ACTIVE_PRIMARY_VALIDATOR} from '@renderer/constants/store';
import {ActivePrimaryValidator} from '@renderer/types/entities';
import {Loading, StateSlice} from '@renderer/types/store';
import {pendingReducer, rejectedReducer, setStateReducer} from '@renderer/utils/store';

type State = StateSlice<ActivePrimaryValidator | null>;

const activePrimaryValidator = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchActivePrimaryValidator.pending, pendingReducer);
    builder.addCase(fetchActivePrimaryValidator.rejected, rejectedReducer);
    builder.addCase(fetchActivePrimaryValidator.fulfilled, setStateReducer);
  },
  initialState: {
    currentRequestId: undefined,
    entities: null,
    error: null,
    loading: Loading.idle,
  } as State,
  name: ACTIVE_PRIMARY_VALIDATOR,
  reducers: {},
});

export default activePrimaryValidator;
