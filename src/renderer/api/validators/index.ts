import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import omit from 'lodash/omit';

import {APP, VALIDATORS} from '@renderer/constants/store';
import {setActivePrimaryValidator} from '@renderer/store/app/activePrimaryValidator';
import {setValidator} from '@renderer/store/network/validators';

import {ActivePrimaryValidator} from '@renderer/types/entities';
import {Loading, RootState} from '@renderer/types/store';
import {fetchActionType} from '@renderer/utils/store';

export const fetchActivePrimaryValidator = createAsyncThunk<void, string, {state: RootState}>(
  fetchActionType(APP, VALIDATORS),
  async (baseUrl, {dispatch, getState, rejectWithValue, requestId}) => {
    // const {currentRequestId, loading} = getState().app.activePrimaryValidator;
    // if (loading !== Loading.pending || requestId !== currentRequestId) return;
    try {
      const response = await axios.get(`${baseUrl}/config`);
      const activePrimaryValidatorData = omit(response.data, ['primary_validator']) as ActivePrimaryValidator;
      const nodeIdentifier = activePrimaryValidatorData.node_identifier;
      const node = {
        ip_address: activePrimaryValidatorData.ip_address,
        port: activePrimaryValidatorData.port,
        protocol: activePrimaryValidatorData.protocol,
      };
      dispatch(setActivePrimaryValidator(activePrimaryValidatorData));
      dispatch(setValidator({node, nodeIdentifier}));
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data);
    }
  },
);
