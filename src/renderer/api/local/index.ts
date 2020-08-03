import {createAsyncThunk} from '@reduxjs/toolkit';

import {fetchActiveBank} from '@renderer/api/banks';
import {LOCAL_ACTIVE_BANK} from '@renderer/constants/store';
import localStore from '@renderer/store/localStore';
import {LocalActiveBank} from '@renderer/types/entities';
import {Loading, RootState} from '@renderer/types/store';
import {formatAddress} from '@renderer/utils/format';

export const setLocalActiveBank = createAsyncThunk<LocalActiveBank | undefined, LocalActiveBank, {state: RootState}>(
  LOCAL_ACTIVE_BANK,
  async (localActiveBank, {dispatch, getState, rejectWithValue, requestId}) => {
    const {currentRequestId, loading} = getState().app.localActiveBank;
    if (loading !== Loading.pending || requestId !== currentRequestId) return;
    try {
      const {ip_address: ipAddress, port, protocol} = localActiveBank;
      const url = formatAddress(ipAddress, port, protocol);
      await dispatch(fetchActiveBank(url));
      localStore.set(LOCAL_ACTIVE_BANK, localActiveBank);
      return localActiveBank;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data);
    }
  },
);
