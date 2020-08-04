import axios from 'axios';

import {setBankConfig} from '@renderer/store/configs/bankConfigs';
import {BankConfig, Network} from '@renderer/types/entities';
import {AppDispatch} from '@renderer/types/store';
import {formatAddress} from '@renderer/utils/format';

export const fetchBankConfig = (network: Network) => async (dispatch: AppDispatch): Promise<BankConfig> => {
  const baseUrl = formatAddress(network.ip_address, network.port, network.protocol);
  const {data} = await axios.get<BankConfig>(`${baseUrl}/config`);

  dispatch(setBankConfig(data)); // it is setting bankConfig even before it knows if other one is successful

  return data;
};
