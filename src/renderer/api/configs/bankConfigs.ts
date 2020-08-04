import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

import {fetchValidatorConfig} from '@renderer/api/configs/validatorConfigs';
import {BANK_CONFIGS} from '@renderer/constants/store';
import {setActiveBank} from '@renderer/store/app/activeBank';
import {BankConfig, Network} from '@renderer/types/entities';
import {RootState} from '@renderer/types/store';
import {formatAddress} from '@renderer/utils/format';

type Arg = Network & {
  nickname?: string;
};

export const fetchBankConfig = createAsyncThunk<BankConfig | undefined, Arg, {state: RootState}>(
  BANK_CONFIGS,
  async (data, {dispatch, getState}) => {
    const baseUrl = formatAddress(data.ip_address, data.port, data.protocol);
    const {data: responseData} = await axios.get<BankConfig>(`${baseUrl}/config`);

    const {node_identifier: nodeIdentifier, primary_validator: primaryValidator} = responseData;
    if (!getState().app.activeBank) {
      const activeBankData = {
        ...data,
        nickname: data.nickname || '',
        node_identifier: nodeIdentifier,
      };
      dispatch(setActiveBank(activeBankData));
    }

    const primaryValidatorData = {
      ip_address: primaryValidator.ip_address,
      port: primaryValidator.port,
      protocol: primaryValidator.protocol,
    };
    dispatch(fetchValidatorConfig(primaryValidatorData));

    return responseData;
  },
);
