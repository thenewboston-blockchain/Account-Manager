import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import omit from 'lodash/omit';

import {fetchActivePrimaryValidator} from '@renderer/api/validators';
import {APP, BANKS} from '@renderer/constants/store';
import {setBank} from '@renderer/store/network/banks';

import ActiveBank from '@renderer/types/entities/ActiveBank';
import {Loading, RootState} from '@renderer/types/store';
import {fetchActionType} from '@renderer/utils/store';
import {formatAddress} from '@renderer/utils/format';

export const fetchActiveBank = createAsyncThunk<ActiveBank | undefined, string, {state: RootState}>(
  fetchActionType(APP, BANKS),
  async (baseUrl, {dispatch, getState, rejectWithValue, requestId}) => {
    const {currentRequestId, loading} = getState().app.activeBank;
    if (loading !== Loading.pending || requestId !== currentRequestId) return;
    try {
      const response = await axios.get(`${baseUrl}/config`);
      const {primary_validator: primaryValidator} = response.data;
      const activeBankData = omit(response.data, ['primary_validator']) as ActiveBank;
      const nodeIdentifier = activeBankData.node_identifier;
      const node = {
        ip_address: activeBankData.ip_address,
        port: activeBankData.port,
        protocol: activeBankData.protocol,
      };
      dispatch(setBank({node, nodeIdentifier}));

      const primaryValidatorAddress = formatAddress(
        primaryValidator.ip_address,
        primaryValidator.port,
        primaryValidator.protocol,
      );
      dispatch(fetchActivePrimaryValidator(primaryValidatorAddress));

      return activeBankData;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data);
    }
  },
);
