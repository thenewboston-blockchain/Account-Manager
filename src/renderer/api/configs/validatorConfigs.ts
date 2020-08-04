import axios from 'axios';

import {setValidatorConfig} from '@renderer/store/configs/validatorConfigs';
import {Network, ValidatorConfig} from '@renderer/types/entities';
import {AppDispatch} from '@renderer/types/store';
import {formatAddress} from '@renderer/utils/format';

export const fetchValidatorConfig = (network: Network) => async (dispatch: AppDispatch): Promise<ValidatorConfig> => {
  const baseUrl = formatAddress(network.ip_address, network.port, network.protocol);
  const {data} = await axios.get<ValidatorConfig>(`${baseUrl}/config`);
  dispatch(setValidatorConfig(data));

  return data;
};
