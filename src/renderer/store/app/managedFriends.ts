import {createSlice} from '@reduxjs/toolkit';

import {MANAGED_FRIENDS} from '@renderer/constants';
import localStore from '@renderer/store/localStore';
import {Dict, ManagedFriend} from '@renderer/types';
import {getStateName, setLocalAndAccountReducer, unsetLocalAndAccountReducer} from '@renderer/utils/store';

const managedFriends = createSlice({
  initialState: (localStore.get(getStateName(MANAGED_FRIENDS)) || {}) as Dict<ManagedFriend>,
  name: MANAGED_FRIENDS,
  reducers: {
    setManagedFriend: setLocalAndAccountReducer<ManagedFriend>(MANAGED_FRIENDS),
    unsetManagedFriend: unsetLocalAndAccountReducer(MANAGED_FRIENDS),
  },
});

export const {setManagedFriend, unsetManagedFriend} = managedFriends.actions;

export default managedFriends;
