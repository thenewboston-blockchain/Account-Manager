import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import omit from 'lodash/omit';

import {ACTIVE_PRIMARY_VALIDATOR} from '@renderer/constants/store';
import {setNetworkValidator} from '@renderer/store/network/validators';
import {ActivePrimaryValidator, NetworkNode} from '@renderer/types/entities';
import {Loading, RootState} from '@renderer/types/store';

export const fetchActivePrimaryValidator = createAsyncThunk<
  ActivePrimaryValidator | undefined,
  string,
  {state: RootState}
>(ACTIVE_PRIMARY_VALIDATOR, async (baseUrl, {dispatch, getState, rejectWithValue, requestId}) => {
  const {currentRequestId, loading} = getState().session.activePrimaryValidator;
  if (loading !== Loading.pending || requestId !== currentRequestId) return;
  try {
    const response = await axios.get(`${baseUrl}/config`);
    const activePrimaryValidatorData = omit(response.data, ['primary_validator']) as ActivePrimaryValidator;
    const validator: NetworkNode = {
      ip_address: activePrimaryValidatorData.ip_address,
      node_identifier: activePrimaryValidatorData.node_identifier,
      port: activePrimaryValidatorData.port,
      protocol: activePrimaryValidatorData.protocol,
    };
    dispatch(setNetworkValidator(validator));

    return activePrimaryValidatorData;
  } catch (error) {
    if (!error.response) throw error;
    return rejectWithValue(error.response.data);
  }
});
