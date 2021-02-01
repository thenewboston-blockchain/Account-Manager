import {createSlice} from '@reduxjs/toolkit';

import {MANAGED_FRIENDS} from '@renderer/constants/actions';
import localStore from '@renderer/store/local';
import {Dict, ManagedFriend} from '@renderer/types';
import {
  clearLocalAndStateReducer,
  getStateName,
  setLocalAndAccountReducer,
  unsetLocalAndAccountReducer,
} from '@renderer/utils/store';

const managedFriends = createSlice({
  initialState: (localStore.get(getStateName(MANAGED_FRIENDS)) || {}) as Dict<ManagedFriend>,
  name: MANAGED_FRIENDS,
  reducers: {
    clearManagedFriends: clearLocalAndStateReducer(),
    setManagedFriend: setLocalAndAccountReducer<ManagedFriend>(MANAGED_FRIENDS),
    unsetManagedFriend: unsetLocalAndAccountReducer(MANAGED_FRIENDS),
  },
});

export const {clearManagedFriends, setManagedFriend, unsetManagedFriend} = managedFriends.actions;

export default managedFriends.reducer;
