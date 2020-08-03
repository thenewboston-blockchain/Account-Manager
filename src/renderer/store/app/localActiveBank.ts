import {createSlice} from '@reduxjs/toolkit';

import {LOCAL_ACTIVE_BANK} from '@renderer/constants/store';
import {LocalActiveBank} from '@renderer/types/entities';
import {Loading, StateSlice} from '@renderer/types/store';

type State = StateSlice<LocalActiveBank | null>;

const localActiveBank = createSlice({
  initialState: {
    currentRequestId: undefined,
    entities: null,
    error: null,
    loading: Loading.idle,
  } as State,
  name: LOCAL_ACTIVE_BANK,
  reducers: {},
});

export default localActiveBank;
