import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

import {BANK_CONFIGS} from '@renderer/constants/store';
import {setActivePrimaryValidator} from '@renderer/store/app/activePrimaryValidator';
import {Network, ValidatorConfig} from '@renderer/types/entities';
import {RootState} from '@renderer/types/store';
import {formatAddress} from '@renderer/utils/format';

export const fetchValidatorConfig = createAsyncThunk<ValidatorConfig | undefined, Network, {state: RootState}>(
  BANK_CONFIGS,
  async (data, {dispatch, getState}) => {
    const baseUrl = formatAddress(data.ip_address, data.port, data.protocol);
    const {data: responseData} = await axios.get<ValidatorConfig>(`${baseUrl}/config`);

    const {node_identifier: nodeIdentifier} = responseData;
    if (!getState().app.activePrimaryValidator) {
      const activePrimaryValidatorData = {
        ...data,
        nickname: '',
        node_identifier: nodeIdentifier,
      };
      dispatch(setActivePrimaryValidator(activePrimaryValidatorData));
    }

    return responseData;
  },
);
