import {createSlice} from '@reduxjs/toolkit';

import {ACTIVE_PRIMARY_VALIDATOR} from '@renderer/constants/store';
import localStore from '@renderer/store/localStore';
import {AppNodeAddressData} from '@renderer/types/entities';
import {getStateName, setLocalAndStateReducer, unsetStateToNullReducer} from '@renderer/utils/store';

const activePrimaryValidator = createSlice({
  initialState: (localStore.get(getStateName(ACTIVE_PRIMARY_VALIDATOR)) || null) as AppNodeAddressData | null,
  name: ACTIVE_PRIMARY_VALIDATOR,
  reducers: {
    setActivePrimaryValidator: setLocalAndStateReducer<AppNodeAddressData>(),
    unsetActivePrimaryValidator: unsetStateToNullReducer(),
  },
});

export const {setActivePrimaryValidator, unsetActivePrimaryValidator} = activePrimaryValidator.actions;

export default activePrimaryValidator;
