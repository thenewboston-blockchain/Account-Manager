import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import omit from 'lodash/omit';

import {APP, VALIDATORS} from '@renderer/constants/store';
import {setNetworkValidator} from '@renderer/store/network/validators';
import {NetworkNode, SessionPrimaryValidator} from '@renderer/types/entities';
import {Loading, RootState} from '@renderer/types/store';
import {fetchActionType} from '@renderer/utils/store';

export const fetchActivePrimaryValidator = createAsyncThunk<
  SessionPrimaryValidator | undefined,
  string,
  {state: RootState}
>(fetchActionType(APP, VALIDATORS), async (baseUrl, {dispatch, getState, rejectWithValue, requestId}) => {
  const {currentRequestId, loading} = getState().app.activePrimaryValidator;
  if (loading !== Loading.pending || requestId !== currentRequestId) return;
  try {
    const response = await axios.get(`${baseUrl}/config`);
    const activePrimaryValidatorData = omit(response.data, ['primary_validator']) as SessionPrimaryValidator;
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
